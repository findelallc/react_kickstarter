import { HeroUIProvider } from '@heroui/react'
import PropTypes from 'prop-types'
import ThemeProvider from './services/theme/theme.provider'
import ThemeToggle from './services/theme/themeToggle'

export default function Providers({ children }) {
    return (
        <HeroUIProvider>
            <ThemeProvider>
                <ThemeToggle />
                {children}
            </ThemeProvider>
        </HeroUIProvider>
    )
}

Providers.propTypes = {
    children: PropTypes.node.isRequired,
}
