import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getQuizById } from "../endpoints/api"

const ViewQuiz = ({ quizId, show, handleClose }) => {
  const {
    data: quiz,
    isLoading,
    isFetched,
    isError,
  } = useQuery(["quiz", quizId], () => getQuizById(quizId), {
    enabled: !!quizId,
  })

  if (isError) {
    return <div className="alert alert-error">Error fetching quiz data</div>
  }
  return (
    <>
      {isFetched && !isLoading && !isError && quiz && (
        <div
          className={`${
            show ? "" : "hidden"
          } p-10 fixed inset-0 flex items-center justify-center`}
        >
          <div className="modal modal-open">
            <div className="modal-box">
              <div className="modal-header">
                <div className="modal-title bg-[#6742c1] p-2 font-bold text-white">
                  {quiz.title}
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleClose()
                  }}
                  className="modal-close-btn text-[#6742c1] text-3xl"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Score: {quiz.score}</p>
                <p>Description: {quiz.description}</p>
                <h3 className="text-lg font-bold mt-4 mb-2">
                  Questions and Answers
                </h3>
                {quiz.questions_answers.map((question, questionIndex) => (
                  <div key={questionIndex} className="mb-4">
                    <p className="font-medium bg-amber-200 p-1 text-black rounded">{`Question ${
                      questionIndex + 1
                    }: ${question.text}`}</p>
                    <ul className="list-disc pl-5">
                      {question.answers.map((answer, answerIndex) => (
                        <li
                          key={answerIndex}
                          className={`${
                            answer.is_true ? "text-green-500" : "text-red-300"
                          }`}
                        >
                          {answer.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button onClick={handleClose} className="btn btn-secondary">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ViewQuiz
