import React from "react";

const Divider = ({ props }) => {
    return (
        <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-300" />
            {props && (
                <>
                    <span className="flex-shrink mx-4 text-gray-300">
                        {props}
                    </span>
                    <div className="flex-grow border-t border-gray-300" />
                </>
            )}
        </div>
    )
}

export default Divider;