import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { listFlashcards, type Flashcard } from "../services/FlashcardsService";
import { updateUserScore } from "../services/UserService";

const FlashcardComponent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [queue, setQueue] = useState<Flashcard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [totalCards, setTotalCards] = useState<number>(0);

    useEffect(() => {
        const fetchFlashcards = async () => {
            if (!id) {
                setError("No category ID provided");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await listFlashcards(Number(id));
                const fetchedFlashcards = response.data;
                setFlashcards(fetchedFlashcards);
                // Initialize queue with all flashcards
                //setQueue([...fetchedFlashcards]);
                setQueue(fetchedFlashcards.slice(0, 3)); // test
                setTotalCards(fetchedFlashcards.length);
            } catch (err: unknown) {
                setError("Failed to load flashcards");
                console.error("Error fetching flashcards:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFlashcards();
    }, [id]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleEasy = async () => {
        if (queue.length === 0) return;
        
        // Remove current card from queue (dequeue)
        const newQueue = [...queue];
        newQueue.shift(); // Remove first card
        
        // Increment score using functional update to get latest value
        setScore(prevScore => {
            const newScore = prevScore + 1;
            
            // Update user score in the backend
            // TODO: Replace hardcoded user ID with actual authenticated user ID
            const userId = 1; // This should come from authentication context
            updateUserScore(userId, 1).catch((err) => {
                console.error("Failed to update user score:", err);
            });
            
            // Check if queue is empty after this card is removed
            if (newQueue.length === 0) {
                setTimeout(() => {
                    alert(`Great job! You've completed all flashcards! Final Score: ${newScore}`);
                }, 100);
            }
            return newScore;
        });
        
        setQueue(newQueue);
        setIsFlipped(false);
    };

    const handleAgain = () => {
        if (queue.length === 0) return;
        
        // Get current card
        const currentCard = queue[0];
        
        // Remove current card from front of queue
        const newQueue = [...queue];
        newQueue.shift();
        
        // Add it back to the end of the queue
        newQueue.push(currentCard);
        
        setQueue(newQueue);
        setIsFlipped(false);
    };

    const currentFlashcard = queue.length > 0 ? queue[0] : null;
    const cardsRemaining = queue.length;
    const cardsCompleted = totalCards - cardsRemaining;
    const progress = totalCards > 0 ? (cardsCompleted / totalCards) * 100 : 0;

    return (
        <>
            <style>{`
                .flashcard-container {
                    perspective: 1000px;
                    width: 100%;
                    max-width: 600px;
                    height: 400px;
                    margin: 0 auto;
                }

                .flashcard {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    transform-style: preserve-3d;
                    transition: transform 0.6s;
                    cursor: pointer;
                }

                .flashcard.flipped {
                    transform: rotateY(180deg);
                }

                .flashcard-front,
                .flashcard-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    border-radius: 15px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 2rem;
                }

                .flashcard-front {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }

                .flashcard-back {
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    color: white;
                    transform: rotateY(180deg);
                }

                .flashcard-content {
                    text-align: center;
                    font-size: 1.5rem;
                    word-wrap: break-word;
                }

                .flashcard-label {
                    font-size: 0.9rem;
                    opacity: 0.8;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .flashcard-actions {
                    margin-top: 2rem;
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                }

                .btn-flashcard {
                    padding: 0.75rem 2rem;
                    border: none;
                    border-radius: 50px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-easy {
                    background: #4caf50;
                    color: white;
                }

                .btn-easy:hover {
                    background: #45a049;
                    transform: translateY(-2px);
                }

                .btn-again {
                    background: #ff9800;
                    color: white;
                }

                .btn-again:hover {
                    background: #e68900;
                    transform: translateY(-2px);
                }

                .progress-bar-container {
                    max-width: 600px;
                    margin: 0 auto 2rem;
                }

                .progress-text {
                    text-align: center;
                    margin-bottom: 0.5rem;
                    color: #666;
                }

                .score-display {
                    text-align: center;
                    margin-bottom: 1.5rem;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #fff;
                }

                .queue-info {
                    text-align: center;
                    margin-bottom: 0.5rem;
                    color: #cecece;
                    font-size: 0.9rem;
                }

                .completion-message {
                    text-align: center;
                    padding: 2rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border-radius: 15px;
                    max-width: 600px;
                    margin: 0 auto;
                }
            `}</style>

            <div className="container container-llmApp" style={{ marginTop: "100px", paddingBottom: "50px" }}>
                <h1 className="text-center mb-4">Flashcards</h1>
                
                {loading && <p className="text-center">Loading flashcards...</p>}
                {error && <div className="alert alert-danger">{error}</div>}
                
                {!loading && !error && totalCards > 0 && queue.length > 0 && (
                    <>
                        <div className="score-display">
                            Score: {score}
                        </div>

                        <div className="progress-bar-container">
                            <div className="queue-info">
                                {cardsRemaining} card{cardsRemaining !== 1 ? 's' : ''} remaining
                            </div>
                            <div className="progress" style={{ height: "8px" }}>
                                <div 
                                    className="progress-bar" 
                                    role="progressbar" 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flashcard-container">
                            <div 
                                className={`flashcard ${isFlipped ? 'flipped' : ''}`}
                                onClick={!isFlipped ? handleFlip : undefined}
                            >
                                <div className="flashcard-front">
                                    <div className="flashcard-label">Question</div>
                                    <div className="flashcard-content">
                                        {currentFlashcard?.question}
                                    </div>
                                    <div style={{ marginTop: "1rem", fontSize: "0.9rem", opacity: 0.7 }}>
                                        Click to reveal answer
                                    </div>
                                </div>
                                <div className="flashcard-back">
                                    <div className="flashcard-label">Answer</div>
                                    <div className="flashcard-content">
                                        {currentFlashcard?.answer}
                                    </div>
                                    <div className="flashcard-actions">
                                        <button 
                                            className="btn-flashcard btn-again"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAgain();
                                            }}
                                        >
                                            Again
                                        </button>
                                        <button 
                                            className="btn-flashcard btn-easy"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEasy();
                                            }}
                                        >
                                            Easy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {!loading && !error && totalCards > 0 && queue.length === 0 && (
                    <div className="completion-message">
                        <h2>🎉 All Done!</h2>
                        <p>You've completed all flashcards!</p>
                        <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
                            Final Score: <strong>{score}</strong>
                        </p>

                        <Link to={`/llmChat`}><span className="btn-flashcard btn-again">Practice with an AI</span></Link>
                    </div>
                )}

                {!loading && !error && totalCards === 0 && (
                    <p className="text-center">No flashcards found for this category.</p>
                )}
            </div>
        </>
    );
};

export default FlashcardComponent;