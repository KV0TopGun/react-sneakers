import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";

const LoadingCard = ({len}) => {
    var batchLoaders = []
    for (let i=0; i<=len; i++) {
        batchLoaders.push(
            <ContentLoader
                className={styles.card}
                speed={2}
                width={155}
                height={240}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                viewBox="0 0 155 190">
                <rect x="0" y="0" rx="10" ry="10" width="155" height="90" />
                <rect x="0" y="110" rx="5" ry="5" width="155" height="15" />
                <rect x="0" y="130" rx="5" ry="5" width="85" height="15" />
                <rect x="0" y="165" rx="5" ry="5" width="80" height="25" />
                <rect x="115" y="160" rx="9" ry="9" width="32" height="32" />
            </ContentLoader>
        )
    }
    return(
        <>
            { batchLoaders }
        </>
    )
}

export default LoadingCard;