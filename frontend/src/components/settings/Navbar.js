const changePageSponsors = () => {
    window.location='/accountsettings';
};

const changePagePoints = () => {
    window.location='/accountsettings';
};

const changePageHome = () => {
    window.location='/accountsettings';
};

const changePageSettings = () => {
    window.location='/accountsettings';
};

export default function Navbar(){


    return(
        <nav class="navbar navbar-dark navbar-expand p-0 bg-dark">
            <div class="container-fluid">
                <ul class="navbar-nav d-none d-md-flex mr-auto">
                    <li class="nav-item"><a class="nav-link" href="#" onClick={changePageSponsors} data-abc="true">Sponsors</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onClick={changePagePoints} data-abc="true">Points</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onClick={changePageHome} data-abc="true">My Cart</a></li>
                </ul>
                <ul class="navbar-nav d-flex align-items-center">
                    <li class="nav-item">
                        <div class="d-flex flex-row">
                            <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" class="rounded-circle" width="30"></img>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a href="#" onClick={changePageSettings} class="nav-link d-flex align-items-center" data-abc="true"><span>Truck Driver</span><i class='bx bxs-chevron-down'></i></a>
                    </li>
                </ul>
            </div> 
        </nav> 
    );
}