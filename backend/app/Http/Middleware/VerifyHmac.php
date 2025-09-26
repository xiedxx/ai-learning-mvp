<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class VerifyHmac {
    public function handle(Request $request, Closure $next) {
        $clientId = $request->header('X-Client-Id');
        $timestamp = $request->header('X-Timestamp');
        $nonce     = $request->header('X-Nonce');
        $signature = $request->header('X-Signature');

        if (!$clientId || !$timestamp || !$nonce || !$signature) {
            return response()->json(['error' => 'Missing signature headers'], 400);
        }
        if ($clientId !== env('API_CLIENT_ID')) {
            return response()->json(['error' => 'Unknown client'], 401);
        }

        $skew = (int)env('SIGN_SKEW_SECONDS', 300);
        if (abs(time() - (int)$timestamp) > $skew) {
            return response()->json(['error' => 'Timestamp skew too large'], 401);
        }

        $method = strtoupper($request->getMethod());
        $path   = $request->getPathInfo(); // e.g. /api/users

        $query  = $request->query();
        ksort($query);
        $qs = http_build_query($query);

        $body = $request->getContent() ?? '';
        $bodyHash = hash('sha256', $body);

        $canonical = implode("\n", [$method, $path, $qs, $bodyHash, $timestamp, $nonce]);
        $serverSig = base64_encode(hash_hmac('sha256', $canonical, env('API_SIGN_KEY'), true));

        if (!hash_equals($serverSig, $signature)) {
            return response()->json(['error' => 'Bad signature'], 401);
        }

        // 防重放：用默认缓存驱动，支持 file/redis
        $cacheKey = "nonce:{$clientId}:{$timestamp}:{$nonce}";
        if (!Cache::add($cacheKey, 1, $skew)) {
            return response()->json(['error' => 'Replay detected'], 401);
        }

        return $next($request);
    }
}
