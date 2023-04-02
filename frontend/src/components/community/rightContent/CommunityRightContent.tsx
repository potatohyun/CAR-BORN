import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../../ErrorComponent";
import Loading from "../../Loading";
import ArticleList from "./ArticleList";
import ButtonItems from "./ButtonItems";

function CommunityRightContent() {
  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <Suspense fallback={<Loading />}>
        <ArticleList />
        <ButtonItems />
      </Suspense>
    </ErrorBoundary>
  );
}

export default CommunityRightContent;
