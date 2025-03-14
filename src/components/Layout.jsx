import Header from "./Header";
import PropTypes from 'prop-types';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
    return (
        <>
            <div className="flex">
                <main className="min-h-screen w-full">
                    <Header />
                    <div className="my-6 container mx-auto">
                        {children}
                    </div>
                </main>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired, // Validates that 'children' is passed
};

export default Layout;