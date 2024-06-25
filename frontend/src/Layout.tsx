import { useLocation } from 'react-router-dom';
import { ReactNode } from "react";
import { Link } from 'react-router-dom';

const Layout = ({ children }: {children: ReactNode}) => {
    const { pathname } = useLocation();
    return (
        <>
            {pathname !== "/" ? 
                <header>
                    <Link to={"/"}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Home
                        </button>
                    </Link>
                    <Link to={"/settings"}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            設定
                        </button>
                    </Link>
                </header>
                : null}
            <div>{  }</div>
        </>
    );
};
              