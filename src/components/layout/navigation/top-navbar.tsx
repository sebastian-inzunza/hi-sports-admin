import { motion } from 'framer-motion'
import { NavbarIcon } from '@/components/icons/navbar-icon'
import UniLogo from '@/components/ui/uni-logo'
import { useUI } from '@/contexts/ui.context'
import AuthorizedMenu from './authorized-menu'

const Navbar = () => {
  const { toggleSidebar } = useUI()

  return (
    <header className="fixed z-40 w-full bg-white shadow">
      <nav className="flex items-center justify-between px-5 py-4 md:px-8">
        {/* <!-- Mobile menu button --> */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={toggleSidebar}
          className="flex h-full items-center justify-center p-2 focus:text-accent focus:outline-none lg:hidden"
        >
          <NavbarIcon />
        </motion.button>

        <div className="ms-5 me-auto hidden md:flex">
          <UniLogo />
        </div>

        <div className="space-s-8 flex items-center">
          <AuthorizedMenu />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
