import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 bg-white/90 border-t border-gray-200 py-10 px-0">
      <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-8 px-4 sm:px-6 md:px-10">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/">
            <Image width={100} height={100} src="/logo.png" alt="Olivia Kids Logo" className="h-20 w-auto mb-2" />
          </Link>
          <span className="text-lg font-bold text-pink-600">Olivia School</span>
          <span className="text-sm text-gray-500">Inspiring Young Minds</span>
        </div>
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="font-semibold text-gray-700">Contact</span>
          <span className="text-gray-600">Email: <a href="mailto:info@oliviakids.com" className="text-blue-600 hover:underline">info@oliviakids.in</a></span>
          <span className="text-gray-600">Mobile: <a href="tel:+911234567890" className="text-blue-600 hover:underline">+91 97750 67892</a></span>
        </div>
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="font-semibold text-gray-700">Address</span>
          <span className="text-gray-600">Bhimbhar, <br/>Madati (Near Bidhan Nagar), <br/>Siliguri, Dist - Darjeeling, <br/>West Bengal, India</span>
        </div>
        <div className="flex flex-col gap-2 items-center md:items-end">
          <span className="font-semibold text-gray-700">Follow Us</span>
          <div className="flex gap-4 mt-1">
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" className="text-blue-600 hover:text-blue-800 text-2xl"><svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg></a>
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" className="text-pink-500 hover:text-pink-700 text-2xl"><svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.783 2.225 7.149 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.334 3.608 1.308 2.634 2.282 2.428 3.394 2.37 4.675 2.312 5.955 2.3 6.364 2.3 12c0 5.636.012 6.045.07 7.325.058 1.281.264 2.393 1.238 3.367.974.974 2.086 1.18 3.367 1.238 1.28.058 1.689.07 7.325.07s6.045-.012 7.325-.07c1.281-.058 2.393-.264 3.367-1.238.974-.974 1.18-2.086 1.238-3.367.058-1.28.07-1.689.07-7.325s-.012-6.045-.07-7.325c-.058-1.281-.264-2.393-1.238-3.367C19.393.334 18.281.128 17 .07 15.719.012 15.309 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.2-10.406a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg></a>
            <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter" className="text-blue-400 hover:text-blue-600 text-2xl"><svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/></svg></a>
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-400 text-center mt-8 w-full">&copy; {new Date().getFullYear()} Olivia Kids School. All rights reserved.</div>
    </footer>
  );
}
