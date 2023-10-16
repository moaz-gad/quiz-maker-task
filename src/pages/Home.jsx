import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getQuizes } from "../endpoints/api"
import CreateNew from "../components/CreateNew"
import ViewQuiz from "../components/ViewQuiz"

const Home = () => {
  const [show, setShow] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedQuizId, setSelectedQuizId] = useState(null)
  const handleClose = () => setShow(false)
  const handleCloseQuiz = () => setShowQuiz(false)
  const handleShow = () => setShow(true)

  const handleViewClick = (quizId) => {
    setSelectedQuizId(quizId)
    setShowQuiz(true)
  }

  const {
    data: quizzes,
    isLoading,
    isError,
    isFetched,
  } = useQuery(["quizzes"], getQuizes)

  return (
    <div className="mx-auto mt-10 p-4">
      <div className="p-4 flex justify-center">
        <button onClick={handleShow} className="btn btn-secondary">
          Create Quiz
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isFetched &&
          !isLoading &&
          !isError &&
          quizzes &&
          quizzes.map((quiz) => (
            <div key={quiz.id} className="col-span-1 w-50 text-white">
              <div className="card bg-[#6742c1]">
                <div className="card-body">
                  <h2 className="card-title">{quiz.title}</h2>
                  <p>{quiz.description}</p>

                  <div className="card-actions mt-4 flex justify-between">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleViewClick(quiz.id)
                      }}
                      className="btn btn-neutral"
                    >
                      View
                    </button>
                    <button className="btn btn-secondary">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <CreateNew show={show} handleClose={handleClose} />
      <ViewQuiz
        quizId={selectedQuizId}
        show={showQuiz}
        handleClose={handleCloseQuiz}
      />
    </div>
  )
}

export default Home
