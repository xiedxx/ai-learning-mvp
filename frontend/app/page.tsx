export default function Page() {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">
        欢迎来到 AI Workstation 🚀
      </h2>
      <p className="text-gray-700">
        这是一个基于 Next.js + TailwindCSS 的最小演示页面。
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <button className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-500">
          开始使用
        </button>
        <button className="rounded border border-blue-600 px-6 py-2 text-blue-600 hover:bg-blue-50">
          了解更多
        </button>
      </div>
    </section>
  );
}
