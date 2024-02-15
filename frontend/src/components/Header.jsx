import './Header.css'
import Title from '../HeaderElement/Title';
import InfoData from '../HeaderElement/InfoData';
import TimeNtc from '../HeaderElement/TimeNtc';

const Header = () => {
    return (
        <header className="header">
            <div className="inner">
                <Title/>
                <InfoData/>
                <TimeNtc/>
            </div>
        </header>
    );
};

export default Header;