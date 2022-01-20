/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import _ from "underscore";

import Questions from "metabase/entities/questions";
import Question from "metabase-lib/lib/Question";
import Visualization from "metabase/visualizations/components/Visualization";
import QuestionResultLoader from "metabase/containers/QuestionResultLoader";
import LoadingAndErrorWrapper from "metabase/components/LoadingAndErrorWrapper";
import { ANALYTICS_CONTEXT } from "metabase/collections/constants";

import { ItemLink } from "../PinnedItemCard/PinnedItemCard.styled";
import { HoverMenu, VizCard } from "./CollectionCardVisualization.styled";

function CollectionCardVisualization({
  item,
  collection,
  metadata,
  onCopy,
  onMove,
}) {
  const handlePin = useCallback(() => {
    item.setPinned(false);
  }, [item]);

  const handleCopy = useCallback(() => {
    onCopy([item]);
  }, [item, onCopy]);

  const handleMove = useCallback(() => {
    onMove([item]);
  }, [item, onMove]);

  const handleArchive = useCallback(() => {
    item.setArchived(true);
  }, [item]);

  return (
    <ItemLink to={item.getUrl()}>
      <VizCard flat>
        <div
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <HoverMenu
            item={item}
            onPin={collection.can_write ? handlePin : null}
            onMove={
              collection.can_write && item.setCollection ? handleMove : null
            }
            onCopy={item.copy ? handleCopy : null}
            onArchive={
              collection.can_write && item.setArchived ? handleArchive : null
            }
            analyticsContext={ANALYTICS_CONTEXT}
          />
        </div>
        <Questions.Loader id={item.id}>
          {({ question: card }) => {
            const question = new Question(card, metadata);
            return (
              <QuestionResultLoader question={question}>
                {({ loading, error, reload, ...resultProps }) => {
                  const shouldShowLoader =
                    loading && resultProps.results == null;
                  return (
                    <LoadingAndErrorWrapper
                      loading={shouldShowLoader}
                      error={error || resultProps?.result?.error}
                      noWrapper
                    >
                      <Visualization
                        onChangeCardAndRun={_.noop}
                        isDashboard
                        showTitle
                        metadata={metadata}
                        {...resultProps}
                      />
                    </LoadingAndErrorWrapper>
                  );
                }}
              </QuestionResultLoader>
            );
          }}
        </Questions.Loader>
      </VizCard>
    </ItemLink>
  );
}

export default CollectionCardVisualization;
