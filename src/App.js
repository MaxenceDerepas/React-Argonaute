import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    console.log(data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://my-app-gud5f.ondigitalocean.app/Member"
                );
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const addMember = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "https://my-app-gud5f.ondigitalocean.app/Member/create",
                {
                    name: name,
                }
            );
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
        setName("");
    };

    return (
        <div className="App">
            <Header />
            <main>
                <h2>Ajouter un(e) Argonaute</h2>
                <form onSubmit={addMember} className="new-member-form">
                    <label>Nom de l'Argonaute</label>
                    <input
                        value={name}
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Charalampos"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <button type="submit">Envoyer</button>
                </form>

                <h2 className="title-member">Membres de l'équipage</h2>
                <section className="member-list">
                    {data.map((elem, index) => {
                        return (
                            <div className="member" key={index}>
                                {elem.name}
                            </div>
                        );
                    })}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default App;
