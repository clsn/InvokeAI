import { Box, Flex } from '@chakra-ui/react';
import { createSelector } from '@reduxjs/toolkit';
import { useAppSelector } from 'app/store/storeHooks';
import { defaultSelectorOptions } from 'app/store/util/defaultMemoizeOptions';
import IAICollapse from 'common/components/IAICollapse';
import ParamCFGScale from 'features/parameters/components/Parameters/Core/ParamCFGScale';
import ParamHeight from 'features/parameters/components/Parameters/Core/ParamHeight';
import ParamIterations from 'features/parameters/components/Parameters/Core/ParamIterations';
import ParamModelandVAEandScheduler from 'features/parameters/components/Parameters/Core/ParamModelandVAEandScheduler';
import ParamSteps from 'features/parameters/components/Parameters/Core/ParamSteps';
import ParamWidth from 'features/parameters/components/Parameters/Core/ParamWidth';
import ImageToImageFit from 'features/parameters/components/Parameters/ImageToImage/ImageToImageFit';
import ImageToImageStrength from 'features/parameters/components/Parameters/ImageToImage/ImageToImageStrength';
import ParamSeedFull from 'features/parameters/components/Parameters/Seed/ParamSeedFull';
import { generationSelector } from 'features/parameters/store/generationSelectors';
import { uiSelector } from 'features/ui/store/uiSelectors';
import { memo } from 'react';

const selector = createSelector(
  [uiSelector, generationSelector],
  (ui, generation) => {
    const { shouldUseSliders } = ui;
    const { shouldFitToWidthHeight, shouldRandomizeSeed } = generation;

    const activeLabel = !shouldRandomizeSeed ? 'Manual Seed' : undefined;

    return { shouldUseSliders, shouldFitToWidthHeight, activeLabel };
  },
  defaultSelectorOptions
);

const ImageToImageTabCoreParameters = () => {
  const { shouldUseSliders, shouldFitToWidthHeight, activeLabel } =
    useAppSelector(selector);

  return (
    <IAICollapse
      label={'General'}
      activeLabel={activeLabel}
      defaultIsOpen={true}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {shouldUseSliders ? (
          <>
            <ParamModelandVAEandScheduler />
            <Box pt={2}>
              <ParamSeedFull />
            </Box>
            <ParamIterations />
            <ParamSteps />
            <ParamCFGScale />
            <ParamWidth isDisabled={!shouldFitToWidthHeight} />
            <ParamHeight isDisabled={!shouldFitToWidthHeight} />
          </>
        ) : (
          <>
            <Flex gap={3}>
              <ParamIterations />
              <ParamSteps />
              <ParamCFGScale />
            </Flex>
            <ParamModelandVAEandScheduler />
            <Box pt={2}>
              <ParamSeedFull />
            </Box>
            <ParamWidth isDisabled={!shouldFitToWidthHeight} />
            <ParamHeight isDisabled={!shouldFitToWidthHeight} />
          </>
        )}
        <ImageToImageStrength />
        <ImageToImageFit />
      </Flex>
    </IAICollapse>
  );
};

export default memo(ImageToImageTabCoreParameters);
