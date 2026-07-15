"use client"

export default function LoadingThreeDotsJumping() {
    return (
        <div className="typing">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <StyleSheet />
        </div>
    )
}

function StyleSheet() {
    return (
        <style>
            {`
            .typing {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 5px;
                height: 16px;
            }

            .typing .dot {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: currentColor;
                will-change: transform, opacity;
                animation: bounce 1.2s ease-in-out infinite;
            }

            .typing .dot:nth-child(2) { animation-delay: 0.16s; }
            .typing .dot:nth-child(3) { animation-delay: 0.32s; }

            @keyframes bounce {
                0%, 60%, 100% { transform: translateY(0);    opacity: 0.4; }
                30%           { transform: translateY(-7px); opacity: 1; }
            }
            `}
        </style>
    )
}

