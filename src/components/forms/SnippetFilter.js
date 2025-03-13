import { useState } from "react";
import Card from "../card/Card";
import CardTitle from "../card/CardTitle";
import Container from "../container/Container";

const SnippetFilter = ({ setFilter }) => {

    const [language, setLanguage] = useState(null);
    const [framework, setFramework] = useState(null);

    const applyFilter = () => {
        event.preventDefault();

        setFilter(filter => {
            return {
                ...filter,
                language: language,
                framework: framework
            }
        })
    }
    return (
        <Container className="min-h-[200px]">
            <Card className="h-full bg-cyan-800">
                <CardTitle className="text-slate-300">Hmmmmm, What are you looking for?</CardTitle>

                <form className="mt-5" onSubmit={applyFilter}>
                    <div className="w-full flex flex-col sm:flex-row gap-5">
                        <select className="flex-1 " name="language" onChange={(event) => setLanguage(prevState => event.target.value)}>
                            <option value="-">Choose Language/Framework</option>
                            <option value="laravel">Laravel</option>
                            <option value="javascript">JavaScript</option>
                            <option value="css">CSS</option>
                        </select>

                        <select className="flex-1 " name="framework" onChange={(event) => setFramework(prevState => event.target.value)}>
                            <option value="-">Select Framework</option>
                            <option value="auth">Auth</option>
                            <option value="packages">Packages</option>
                            <option value="blade">Blade</option>
                        </select>
                    </div>

                    <div className="w-full mt-5 flex justify-end gap-5">
                        <input type="text" placeholder='Search your snippets...' className="flex-1" />
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </form>
            </Card>
        </Container>
    );
}

export default SnippetFilter;