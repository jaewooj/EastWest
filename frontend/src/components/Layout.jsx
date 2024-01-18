import Footer from './Footer'
import Header from './Header'
import { Outlet }  from 'react-router-dom'
import './Layout.css';

const Layout = () => {
    return (
        <div id="wrap">
            <Header />
                <main className="main">
                    <div className="inner">
                        <Outlet />

                    </div>
                </main>
            <Footer />
        </div>
    );
};

export default Layout;