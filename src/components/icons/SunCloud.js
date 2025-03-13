import Image from "next/image";


const SunCloud = ({ className }) => {
    return (
        <Image src="/sun-cloud.png" width={90} height={90} className="aspect-auto" alt="weather icon" />
    );
}

export default SunCloud;