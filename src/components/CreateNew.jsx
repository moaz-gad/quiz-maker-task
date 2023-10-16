import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createQuiz } from "../endpoints/api"
import "./CreateNew.css"
const CreateNew = ({ show, handleClose }) => {
  const [questions, setQuestions] = useState([
    { text: "", answers: [{ text: "", isCorrect: false }] },
  ])
  const [title, setTitle] = useState("")
  const [score, setScore] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")
  const [validated, setValidated] = useState(false)

  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(createQuiz, {
    onSuccess: () => {
      queryClient.invalidateQueries("quizzes")
      handleClose()
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    const quizData = {
      title,
      score: parseInt(score, 10),
      description,
      questions_answers: questions.map((question) => ({
        text: question.text,
        answers: question.answers.map((answer) => ({
          text: answer.text,
          is_true: answer.isCorrect,
        })),
      })),
    }

    try {
      await mutateAsync(quizData)

      handleClose()
    } catch (error) {
      console.error("Error creating quiz:", error)
    }
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", answers: [{ text: "", isCorrect: false }] },
    ])
  }
  const addAnswer = (questionIndex) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].answers.push({
      text: "",
      isCorrect: false,
    })
    setQuestions(updatedQuestions)
  }
  const removeAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].answers.splice(answerIndex, 1)
    setQuestions(updatedQuestions)
  }
  const removeQuestion = (questionIndex) => {
    const updatedQuestions = [...questions]
    updatedQuestions.splice(questionIndex, 1)
    setQuestions(updatedQuestions)
  }

  const handleQuestionChange = (questionIndex, value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].text = value
    setQuestions(updatedQuestions)
  }

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].answers[answerIndex].text = value
    setQuestions(updatedQuestions)
  }

  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].answers = updatedQuestions[
      questionIndex
    ].answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === answerIndex,
    }))
    setQuestions(updatedQuestions)
  }
  // The rest of your component's code remains unchanged...

  const questionInputs = questions.map((question, questionIndex) => (
    <div className="p-5 border-b space-y-4" key={questionIndex}>
      <div className="flex flex-wrap items-end space-x-4">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder={`Question ${questionIndex + 1} text`}
            value={question.text}
            onChange={(e) =>
              handleQuestionChange(questionIndex, e.target.value)
            }
            className="input w-full bg-[#d926a9]" // daisyUI input class
          />
        </div>
        <div>
          <button
            onClick={() => removeQuestion(questionIndex)}
            className="btn btn-outline btn-error" // daisyUI button classes
          >
            Remove Question
          </button>
        </div>
      </div>

      {question.answers.map((answer, answerIndex) => (
        <div
          key={answerIndex}
          className="flex flex-wrap items-center space-x-4"
        >
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder={`Answer ${answerIndex + 1} text`}
              value={answer.text}
              onChange={(e) =>
                handleAnswerChange(questionIndex, answerIndex, e.target.value)
              }
              className="input w-full bg-[#d926a9] border-s-8 border-red-950" // daisyUI input class
            />
          </div>
          <div className="flex gap-2 ">
            <input
              type="radio"
              name={`correctAnswer${questionIndex}`}
              id={`correctAnswer${questionIndex}-${answerIndex}`}
              checked={answer.isCorrect}
              onChange={() =>
                handleCorrectAnswerChange(questionIndex, answerIndex)
              }
              className="radio radio-secondary" // daisyUI radio input class
            />
            <label
              for={`correctAnswer${questionIndex}-${answerIndex}`}
              className="cursor-pointer inline-flex items-center text-black"
            >
              Correct
            </label>
          </div>
          <div>
            <button
              onClick={() => removeAnswer(questionIndex, answerIndex)}
              className="btn btn-outline btn-error" // daisyUI button classes
            >
              Remove Answer
            </button>
          </div>
        </div>
      ))}

      <div>
        <button
          onClick={(e) => {
            e.preventDefault()
            addAnswer(questionIndex)
          }}
          className="btn btn-success" // daisyUI button class
        >
          Add Answer
        </button>
      </div>
    </div>
  ))

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center${
        show ? "" : " hidden"
      }`}
    >
      <div
        style={{ maxHeight: "85vh" }} // Controlled via inline style or you can use a class
        className="relative bg-white p-10 rounded shadow-xl w-full max-w-4xl overflow-y-auto"
      >
        {/* rest of your component */}
        <div className="modal-content text-black">
          {/* Modal Header */}
          <div className="modal-header">
            <h2 className="modal-title text-[#6742c1] font-bold">
              Create New Quiz
            </h2>
            <button
              className="close-modal-btn btn-lg text-[#6742c1]"
              onClick={handleClose}
            >
              &times;
            </button>
          </div>

          {/* Modal Body */}
          <form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="modal-body"
          >
            {/* ... Your form fields ... */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Title Field */}
              <div>
                <input
                  type="text"
                  placeholder="Quiz title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="input w-full bg-[#d926a9]"
                />
                {/* Conditionally show validation message */}
                {!title && (
                  <span className="text-xs text-error">
                    Please enter a title.
                  </span>
                )}
              </div>
              {/* Score Field */}
              <div>
                <input
                  type="number"
                  placeholder="Quiz score"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  required
                  className="input w-full bg-[#d926a9]"
                />
                {!score && (
                  <span className="text-xs text-error">
                    Please enter a score.
                  </span>
                )}
              </div>
              {/* URL Field */}
              <div>
                <input
                  type="text"
                  placeholder="Video URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="input w-full bg-[#d926a9]"
                />
                {!url && (
                  <span className="text-xs text-error">
                    Please enter a URL.
                  </span>
                )}
              </div>
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <textarea
                rows={3}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full resize-none bg-amber-200"
              ></textarea>
            </div>

            {/* Questions and Answers Section */}
            <div className="mb-4">
              <legend className="text-lg font-semibold">
                Questions and Answers
              </legend>
              {questionInputs}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={addQuestion}
                  className="btn btn-dark"
                >
                  Add Question
                </button>
              </div>
            </div>
            <div className="form-actions">
              <button
                type="submit"
                className="submit-btn btn-success btn"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Add Quiz"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateNew
