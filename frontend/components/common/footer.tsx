const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-100 py-4">
            <div className="container mx-auto px-4 text-center text-sm">
                © {new Date().getFullYear()} Smart Career Match. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer