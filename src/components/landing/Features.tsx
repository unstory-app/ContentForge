export default function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-100 dark:border-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-xl font-bold mb-4">Multi-Platform</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
            Generated content for Twitter, LinkedIn, and YouTube Shorts from a single input link.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Cloud Native</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
            Powered by Puter.js for zero-latency AI processing and secure cloud storage.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">SEO Optimized</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
            Every output is designed to rank and capture maximum attention algorithmically.
          </p>
        </div>
      </div>
    </section>
  );
}
