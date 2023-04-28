import React from "react"

function App() {
    const [loading, setLoading] = React.useState(false)
    const [readMore, setReadMore] = React.useState(false)
    const [tours, setTours] = React.useState([])

    const removeTour = (id) => {
        const newTours = tours.filter((tour) => tour.id !== id)

        setTours(newTours)
    }

    const fetchTours = async () => {
        setLoading(true)

        try {
            const response = await fetch(
                "https://course-api.com/react-tours-project"
            )
            const t = await response.json()
            setTours(t)

            setLoading(false)
        } catch (error) {
            console.log(error)

            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchTours()
    }, [])

    if (loading) {
        return (
            <main>
                <div className="loading">
                    <h1>loading...</h1>
                </div>
            </main>
        )
    }

    if (tours.length === 0) {
        return (
            <main>
                <div className="title">
                    <h2>no tours left</h2>
                    <button className="btn" onClick={() => fetchTours()}>
                        refresh
                    </button>
                </div>
            </main>
        )
    }

    const tourElements = tours.map((tour) => {
        // console.log(tour)

        return (
            <article key={tour.id} className="single-tour">
                <img src={tour.image} alt={tour.name} />
                <footer>
                    <div className="tour-info">
                        <h4>{tour.name}</h4>
                        <h4 className="tour-price">${tour.price}</h4>
                    </div>
                    <p>
                        {readMore
                            ? tour.info
                            : `${tour.info.substring(0, 200)}...`}
                        <button onClick={() => setReadMore(!readMore)}>
                            {readMore ? "show less" : "  read more"}
                        </button>
                    </p>
                    <button
                        className="delete-btn"
                        onClick={() => removeTour(tour.id)}
                    >
                        not interested
                    </button>
                </footer>
            </article>
        )
    })

    return (
        <main>
            <section>
                <div className="title">
                    <h2>our tours</h2>
                    <div className="underline"></div>
                </div>
                <div>{tourElements}</div>
            </section>
        </main>
    )
}

export default App
