import './BedeliaInformationBar.css';

function BedeliaInformationBar() {
    
    return(
        <section>
            <div className="bedeliaStatusBar">
                <div className='informationContent'>
                    <p>Bienvenido:</p>
                </div>
                <div className="itemRight">
                    <button className="logOutButton">Salir</button>
                </div>
            </div>
        </section> 
    );

};
export default BedeliaInformationBar;