import Image from "next/image";


const Sun = ({ className }) => {
    return (
        <Image src="/sun.png" width={90} height={90} className="aspect-auto" alt="weather icon" />
    );
}

export default Sun;