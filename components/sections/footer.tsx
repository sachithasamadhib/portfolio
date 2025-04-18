export default function Footer() {
  return (
    <footer className="py-12 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-zinc-400 mb-2">&copy; {new Date().getFullYear()} Sachitha Samadhi. All rights reserved.</p>
          <p className="text-zinc-500 text-sm">Crafted with experimental code and creative vision</p>
        </div>
      </div>
    </footer>
  )
}
