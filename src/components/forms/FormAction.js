import BaseButton from "../buttons/BaseButton";
import BaseLink from "../buttons/BaseLink";


const FormAction = ({ backUrl = "", isSubmitted, onClose = false, className = "" }) => {
    return (
        <div className={`w-full flex flex-col md:flex-row md:items-center md:justify-start gap-5 mt-6 ${ className }`}>
            {
                !isSubmitted ? (
                    <>
                        <BaseButton type="submit" className="!bg-[#13ad86] text-base text-white md:text-base" >
                            Save Changes
                        </BaseButton>

                        {
                            backUrl ? (
                                <BaseLink href={ backUrl } className="!bg-orange-400 text-base text-white md:text-base" >
                                    Back
                                </BaseLink>
                            )
                            :
                            onClose ?
                            (
                                <BaseButton className="!bg-orange-400 text-base text-white md:text-base" onClick={onClose}>Abort</BaseButton>
                            )
                            : ""
                        }
                    </>
                )
                : <BaseButton className="!bg-blue-500 text-base text-white md:text-base" >
                        Please wait ...
                    </BaseButton>
            }
        </div>
    );
}


export default FormAction;