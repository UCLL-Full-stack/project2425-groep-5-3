import { useRouter } from "next/router";

const Language: React.FC = () => {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;

    const handleLanguageChange = (event: { target: { value: string } }) => {
        // get new locale from event and push it to the router
        const newLocale = event.target.value;
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };

    return (
        <div className="nav-link fs-5 text-white px-3 py-2">
            <label htmlFor="language" className="text-white">
                Language
            </label>
            <select
                id="language"
                className="ml-2 p-1"
                value={locale}
                onChange={handleLanguageChange}
            >
                <option value="nl">Nederlands</option>
                <option value="en">English</option>
            </select>
        </div>
    );
};

export default Language;
