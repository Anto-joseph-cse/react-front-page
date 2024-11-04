// src/components/Captcha.js
import React, { useState, useEffect, useCallback } from 'react';

const Captcha = ({ onChange }) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(0);

    const generateCaptcha = useCallback(() => {
        const n1 = Math.floor(Math.random() * 10); // Random number between 0-9
        const n2 = Math.floor(Math.random() * 10); // Random number between 0-9
        setNum1(n1);
        setNum2(n2);
        setCorrectAnswer(n1 + n2); // Correct answer for the addition
        setUserAnswer(''); // Reset user answer
        onChange(false); // Reset captcha validity
    }, [onChange]);

    useEffect(() => {
        generateCaptcha();
    }, [generateCaptcha]);

    const handleChange = (e) => {
        setUserAnswer(e.target.value);
        onChange(e.target.value === String(correctAnswer)); // Notify parent of the answer correctness
    };

    return (
        <div className="captcha">
            <p>Solve the following:</p>
            <p>{num1} + {num2} = ?</p>
            <input
                type="text"
                value={userAnswer}
                onChange={handleChange}
                required
            />
            <button type="button" onClick={generateCaptcha}>Refresh</button>
        </div>
    );
};

export default Captcha;
