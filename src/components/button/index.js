import './index.css';
import { useEffect } from 'react';

export default function Button({ route, children, style, routeData, onClick, loading }) {
    const callback = onClick ? onClick : () => {};
    return (
        <div className={`button ${loading ? "loading" : ""}`}>
            <button style={style} onClick={callback()}>{children}</button>
        </div>);
}