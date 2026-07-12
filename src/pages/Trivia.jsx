import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { characters } from "../data/characters";

const triviaBank = {
  victim: [
    {
      question: "Who created Victim?",
      options: ["Alan Becker", "The Dark Lord", "Mitsi"],
      answer: 0,
    },
    {
      question: "What digital world did Victim escape into?",
      options: ["The Outernet", "The Nether", "The Box"],
      answer: 0,
    },
    {
      question: "Who helped Victim recover from his trauma?",
      options: ["Mitsi", "Blue", "Yellow"],
      answer: 0,
    },
    {
      question: "What company did Victim help build?",
      options: ["Rocket Corporation", "The Chosen One Corp", "Pixel Labs"],
      answer: 0,
    },
    {
      question: "What identity did Victim take after being renamed?",
      options: ["H4CK3R", "NO ONE", "The Chosen One"],
      answer: 0,
    },
  ],
  red: [
    {
      question: "What is Red especially known for?",
      options: ["His bond with animals", "His brewing skills", "His music"],
      answer: 0,
    },
    {
      question: "In which world did Red form strong bonds with creatures?",
      options: ["Minecraft", "Pokémon", "League of Legends"],
      answer: 0,
    },
    {
      question: "What quality often gets Red into trouble?",
      options: ["His impulsive nature", "His patience", "His shyness"],
      answer: 0,
    },
    {
      question: "Who is one of Red's closest allies?",
      options: ["The Second Coming", "Victim", "The Animator"],
      answer: 0,
    },
    {
      question: "What kind of personality does Red usually show?",
      options: ["Energetic and brave", "Quiet and cautious", "Cold and distant"],
      answer: 0,
    },
  ],
  blue: [
    {
      question: "What subject does Blue become known for in Minecraft?",
      options: ["Brewing", "Mining", "Building"],
      answer: 0,
    },
    {
      question: "What ingredient became one of Blue's favorite discoveries?",
      options: ["Nether Wart", "Redstone", "Wheat"],
      answer: 0,
    },
    {
      question: "What kind of thinker is Blue?",
      options: ["Calm and analytical", "Impulsive and loud", "Aggressive and rude"],
      answer: 0,
    },
    {
      question: "What does Blue often use to help his teammates?",
      options: ["Potions", "Music", "Crowns"],
      answer: 0,
    },
    {
      question: "What is Blue's main strength in a crisis?",
      options: ["Careful problem-solving", "Speed alone", "Showing off"],
      answer: 0,
    },
  ],
  green: [
    {
      question: "What is Green especially known for?",
      options: ["Creativity and performance", "Alchemy", "Engineering"],
      answer: 0,
    },
    {
      question: "What kind of activities does Green enjoy?",
      options: ["Music, dancing, and content creation", "Mining and farming", "Brewing potions"],
      answer: 0,
    },
    {
      question: "What world did Green help survive with the group?",
      options: ["Minecraft", "Pokemon", "The Outernet"],
      answer: 0,
    },
    {
      question: "What did Green learn to balance over time?",
      options: ["Entertainment and friendship", "Fighting and sleeping", "Exploring and hiding"],
      answer: 0,
    },
    {
      question: "What quality helps Green stand out in battles?",
      options: ["Agility and quick thinking", "Pure strength", "Long range attacks"],
      answer: 0,
    },
  ],
  yellow: [
    {
      question: "What kind of role does Yellow often play?",
      options: ["Creative and supportive", "Main fighter", "Animal handler"],
      answer: 0,
    },
    {
      question: "What kind of skills does Yellow often use?",
      options: ["Technical and inventive skills", "Potion brewing", "Animal care"],
      answer: 0,
    },
    {
      question: "What helps Yellow support the team?",
      options: ["Ideas and problem-solving", "Speed alone", "Loud speeches"],
      answer: 0,
    },
    {
      question: "What is Yellow known for creating?",
      options: ["Visual solutions and clever tools", "Weapons only", "Food recipes"],
      answer: 0,
    },
    {
      question: "What is one of Yellow's strengths in a group?",
      options: ["Helping morale and solving problems", "Direct combat", "Fishing"],
      answer: 0,
    },
  ],
  "the-animator": [
    {
      question: "Who is the creator of the stick figures?",
      options: ["The Animator", "The Chosen One", "The Dark Lord"],
      answer: 0,
    },
    {
      question: "What role does The Animator play in the universe?",
      options: ["The creator and source of the world", "The main enemy", "A random villager"],
      answer: 0,
    },
    {
      question: "What can The Animator's actions change?",
      options: ["The environment and the rules of the world", "Only music", "Only animals"],
      answer: 0,
    },
    {
      question: "What is The Animator's main influence on the characters?",
      options: ["Their existence and the conditions they live under", "Their clothing", "Their favorite foods"],
      answer: 0,
    },
    {
      question: "What kind of presence does The Animator have?",
      options: ["A creative and powerful one", "A silent and weak one", "A purely comic one"],
      answer: 0,
    },
  ],
};

function shuffleQuestions(pool) {
  return [...pool].sort(() => Math.random() - 0.5);
}

export default function TriviaPage() {
  const [selectedSlug, setSelectedSlug] = useState("red");
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [completedCharacter, setCompletedCharacter] = useState(null);
  const [cardKey, setCardKey] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const selectedCharacter = characters.find((c) => c.slug === selectedSlug) || characters[0];
  const currentQuestion = questions[questionIndex];
  const showConfetti = quizFinished && questions.length > 0 && score === questions.length;
  const confettiPieces = Array.from({ length: 24 }, (_, index) => index);

  function startTrivia() {
    const pool = triviaBank[selectedSlug] || [];
    const shuffled = shuffleQuestions(pool);
    const chosen = shuffled.slice(0, Math.min(5, pool.length));

    setQuestions(chosen);
    setQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuizStarted(Boolean(chosen.length));
    setQuizFinished(false);
    setCompletedCharacter(null);
    setTransitioning(false);
    setTimeLeft(10);
    setCardKey((value) => value + 1);
  }

  function handleAnswer(index) {
    if (!currentQuestion || showFeedback) return;

    setSelectedAnswer(index);
    setShowFeedback(true);
    setTimeLeft(10);

    if (index === currentQuestion.answer) {
      setScore((value) => value + 1);
    }
  }

  function goNext() {
    if (!currentQuestion) return;

    if (questionIndex === questions.length - 1) {
      setQuizFinished(true);
      setQuizStarted(false);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setCompletedCharacter(selectedCharacter);
      setTransitioning(false);
      setTimeLeft(10);
      setCardKey((value) => value + 1);
    } else {
      setTransitioning(true);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTimeLeft(10);

      window.setTimeout(() => {
        setQuestionIndex((value) => value + 1);
        setTransitioning(false);
        setCardKey((value) => value + 1);
      }, 220);
    }
  }

  useEffect(() => {
    if (!quizStarted || !currentQuestion || quizFinished || !showFeedback) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          goNext();
          return 0;
        }

        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [quizStarted, currentQuestion, questionIndex, quizFinished, showFeedback]);

  return (
    <div className="page trivia-page">
      {showConfetti && (
        <div className="confetti-overlay" aria-hidden="true">
          {confettiPieces.map((piece) => (
            <span
              key={piece}
              className="confetti-piece"
              style={{
                left: `${(piece % 8) * 12 + 4}%`,
                animationDelay: `${piece * 0.03}s`,
                backgroundColor: ["#ff4d4d", "#4dd0ff", "#61d86a", "#ffd166", "#b388ff"][piece % 5],
                animationDuration: `${2.2 + (piece % 4) * 0.25}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container">
        <Link to="/" className="back-link">← Back to Home</Link>

        <h1 className="title">Trivia</h1>
        <p className="subtitle">
          Pick a character and answer a fresh set of questions. Every quiz uses a new mix of questions, so the experience changes each time.
        </p>

        <div className="trivia-panel">
          <div className="trivia-controls">
            <label className="trivia-label" htmlFor="character-select">
              Character
            </label>
            <select
              id="character-select"
              className="trivia-select"
              value={selectedSlug}
              onChange={(event) => setSelectedSlug(event.target.value)}
            >
              {characters.map((character) => (
                <option key={character.slug} value={character.slug}>
                  {character.name}
                </option>
              ))}
            </select>
            <button className="read-more-btn" onClick={startTrivia}>
              Start quiz
            </button>
          </div>

          {!quizStarted && !quizFinished && (
            <div className="trivia-empty">
              Choose a character and start a new quiz to begin.
            </div>
          )}

          {quizStarted && currentQuestion && (
            <div key={cardKey} className={`trivia-card ${transitioning ? "trivia-card-exit" : "trivia-card-enter"}`}>
              <div className="trivia-progress">
                Question {questionIndex + 1} of {questions.length}
                {showFeedback ? ` • Auto-next in ${timeLeft}s` : ""}
              </div>
              <h2 className="trivia-question">{currentQuestion.question}</h2>
              <div className="trivia-options">
                {currentQuestion.options.map((option, index) => {
                  const isCorrect = showFeedback && index === currentQuestion.answer;
                  const isWrong = showFeedback && selectedAnswer === index && index !== currentQuestion.answer;

                  return (
                    <button
                      key={index}
                      className={`trivia-option ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                      onClick={() => handleAnswer(index)}
                      disabled={showFeedback}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div className="trivia-feedback">
                  <p>
                    {selectedAnswer === currentQuestion.answer
                      ? "Correct!"
                      : `Not quite. The correct answer is: ${currentQuestion.options[currentQuestion.answer]}.`}
                  </p>
                  <button className="read-more-btn" onClick={goNext}>
                    {questionIndex === questions.length - 1 ? "See results" : "Next question"}
                  </button>
                </div>
              )}
            </div>
          )}

          {quizFinished && (
            <div className="trivia-card">
              <h2 className="trivia-question">Quiz complete</h2>
              <p className="trivia-result">
                You got {score} out of {questions.length} correct for {completedCharacter?.name || selectedCharacter?.name}.
              </p>
              <button className="read-more-btn" onClick={startTrivia}>
                Try another round
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
