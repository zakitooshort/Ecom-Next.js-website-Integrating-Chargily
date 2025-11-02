import Link from "next/link";
export const Navbar = () =>{
    return(
        <nav className="sticky top-0 z-50 bg-white shadow">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link href="/" className="hover:text-blue-600">My Ecommerce</Link>
            </div>
            <div className=" md-flex space-x-6">
                <Link href="/products">products</Link>
                <Link href="/checkout" className="hover:text-blue-600">Checkout</Link>
                <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            </div>
        </nav>
    )
}