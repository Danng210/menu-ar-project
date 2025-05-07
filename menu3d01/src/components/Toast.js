import React from 'react';
import { FiInfo } from 'react-icons/fi';

export default function Toast({ mensaje, visible }) {
    if (!visible) return null;

    return <div className="toast">
        <FiInfo />
        <p>{mensaje}</p></div>;
}