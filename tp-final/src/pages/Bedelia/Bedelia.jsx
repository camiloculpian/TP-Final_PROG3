
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Content from '../../layouts/Content';
import BedeliaMenu from '../../components/BedeliaMenu';

function Bedelia(){
    return (
        <>
            <Header />
            <Content>
                <nav className="contentItem">
                    <BedeliaMenu />
                </nav>
            </Content>
            <Footer />
        </>
    );
}

export default Bedelia;