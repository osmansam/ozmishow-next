import { ContainerType } from "@/types";

type SchemaContainer = ContainerType & Record<string, any>;

const pick = <T>(...values: Array<T | undefined | null>): T | undefined => {
  return values.find((value) => value !== undefined && value !== null);
};

const pickArray = <T>(...values: Array<T[] | undefined | null>): T[] => {
  return values.find((value) => Array.isArray(value)) || [];
};

const normalizeContainer = (item: SchemaContainer, page: string) => {
  const props = item.props && typeof item.props === "object" ? item.props : {};
  const data = item.data && typeof item.data === "object" ? item.data : {};
  const id =
    pick(item._id, item.id, props._id, props.id, data._id, data.id) || "";

  return {
    ...item,
    ...props,
    ...data,
    id,
    _id: id,
    page: pick(item.page, props.page, data.page, page) || page,
    componentType:
      pick(item.componentType, props.componentType, data.componentType) || "",
    componentStyle:
      pick(
        item.componentStyle,
        item.style,
        props.componentStyle,
        props.style,
        data.componentStyle,
        data.style,
      ) || {},
    mainHeader: pick(
      item.mainHeader,
      item.mainMainHeader,
      props.mainHeader,
      data.mainHeader,
    ),
    mainMainHeader: pick(
      item.mainMainHeader,
      item.mainHeader,
      props.mainMainHeader,
      data.mainMainHeader,
    ),
  };
};

export const buildPictureWithStyleProps = (
  item: SchemaContainer,
  page: string,
) => {
  return normalizeContainer(item, page);
};

export const buildTwoPictureProps = (item: SchemaContainer, page: string) => {
  const normalized = normalizeContainer(item, page);

  return {
    ...normalized,
    mainHeader: pick(normalized.mainHeader, normalized.mainMainHeader),
    twoPictureArray: pickArray(
      normalized.twoPictureArray,
      normalized.sliderArray,
      normalized.carouselArray,
      normalized.iconExplainArray,
      normalized.freqAskedArray,
      normalized.explanationArray,
      normalized.resumeBoxArray,
      normalized.resumeIconArray,
      normalized.fullPageItemArray,
      normalized.workTeamArray,
    ),
  };
};

export const buildIconExplainProps = (item: SchemaContainer, page: string) => {
  const normalized = normalizeContainer(item, page);

  return {
    ...normalized,
    iconExplainArray: pickArray(
      normalized.iconExplainArray,
      normalized.twoPictureArray,
    ),
  };
};

export const buildNewsProps = (item: SchemaContainer, page: string) => {
  return normalizeContainer(item, page);
};

export const buildSliderProps = (item: SchemaContainer, page: string) => {
  const normalized = normalizeContainer(item, page);

  return {
    ...normalized,
    mainMainHeader: pick(normalized.mainMainHeader, normalized.mainHeader),
    sliderArray: pickArray(normalized.sliderArray, normalized.twoPictureArray),
  };
};

export const buildTestimonialSliderProps = (
  item: SchemaContainer,
  page: string,
) => {
  const normalized = normalizeContainer(item, page);

  return {
    ...normalized,
    testimonialArray: pickArray(
      normalized.testimonialArray,
      normalized.testimonialSliderArray,
      normalized.sliderArray,
      normalized.twoPictureArray,
    ),
    testimonialSliderArray: pickArray(
      normalized.testimonialSliderArray,
      normalized.testimonialArray,
      normalized.sliderArray,
      normalized.twoPictureArray,
    ),
  };
};

export const buildFreqAskedProps = (item: SchemaContainer, page: string) => {
  const normalized = normalizeContainer(item, page);

  return {
    ...normalized,
    freqAskedArray: pickArray(
      normalized.freqAskedArray,
      normalized.twoPictureArray,
    ),
  };
};

export const buildBorderBoxProps = (item: SchemaContainer, page: string) => {
  return normalizeContainer(item, page);
};

export const buildTypingEffectProps = (item: SchemaContainer, page: string) => {
  return normalizeContainer(item, page);
};

export const buildExplanationBarProps = (
  item: SchemaContainer,
  page: string,
) => {
  const normalized = normalizeContainer(item, page);

  return {
    ...normalized,
    explanationArray: pickArray(
      normalized.explanationArray,
      normalized.twoPictureArray,
    ),
    mainMainHeader: pick(normalized.mainMainHeader, normalized.mainHeader),
  };
};

export const buildProgressBarProps = (item: SchemaContainer, page: string) => {
  return normalizeContainer(item, page);
};

export const buildResumeBoxProps = (item: SchemaContainer, page: string) => {
  const normalized = normalizeContainer(item, page);

  return {
    ...normalized,
    resumeBoxArray: pickArray(
      normalized.resumeBoxArray,
      normalized.twoPictureArray,
    ),
  };
};

export const buildResumeIconProps = (item: SchemaContainer, page: string) => {
  const normalized = normalizeContainer(item, page);

  return {
    ...normalized,
    resumeIconArray: pickArray(
      normalized.resumeIconArray,
      normalized.twoPictureArray,
    ),
  };
};

export const buildCarouselProps = (item: SchemaContainer, page: string) => {
  const normalized = normalizeContainer(item, page);

  return {
    ...normalized,
    mainMainHeader: pick(normalized.mainMainHeader, normalized.mainHeader),
    carouselArray: pickArray(
      normalized.carouselArray,
      normalized.twoPictureArray,
      normalized.sliderArray,
    ),
  };
};

export const buildYoutubeVideoProps = (item: SchemaContainer, page: string) => {
  return normalizeContainer(item, page);
};

export const buildWorkTeamBarProps = (item: SchemaContainer, page: string) => {
  const normalized = normalizeContainer(item, page);

  return {
    ...normalized,
    workTeamArray: pickArray(
      normalized.workTeamArray,
      normalized.twoPictureArray,
    ),
    mainMainHeader: pick(normalized.mainMainHeader, normalized.mainHeader),
  };
};

export const buildBackgroundHeaderProps = (
  item: SchemaContainer,
  page: string,
) => {
  return normalizeContainer(item, page);
};

export const buildFullPageItemProps = (item: SchemaContainer, page: string) => {
  const normalized = normalizeContainer(item, page);

  return {
    ...normalized,
    fullPageItemArray: pickArray(
      normalized.fullPageItemArray,
      normalized.twoPictureArray,
    ),
  };
};
