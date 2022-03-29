
interface Props {
    title: string

}
const Button = ({title} : Props ) => {
    return (
        <div className="flex justify-center">
            <button className="bg-white rounded-md p-2 shadow-lg w-3/4" >{title}</button>
        </div>
    );
}

export default Button;