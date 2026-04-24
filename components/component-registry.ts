import { ContainerType } from "@/types";
import { lazy } from "react";
import * as propBuilders from "./propBuilders";

const PictureAtLeft = lazy(
  () => import("@/app/components/pictureAndText/picLeft/PictureAtLeft"),
);
const PictureAtLeftType3 = lazy(
  () => import("@/app/components/pictureAndText/picLeft/PictureAtLeftType3"),
);
const PictureAtRight = lazy(
  () => import("@/app/components/pictureAndText/picRight/PictureAtRight"),
);
const PicType4 = lazy(
  () => import("@/app/components/pictureAndText/picRight/PicType4"),
);
const PicLeftType5 = lazy(
  () => import("@/app/components/pictureAndText/picLeft/PicLeftType5"),
);
const PicLeftType6 = lazy(
  () => import("@/app/components/pictureAndText/picLeft/PicLeftType6"),
);
const IconExplainContainer = lazy(
  () => import("@/app/components/IconExplain/type1/IconExplainContainer"),
);
const IconExplainContainer2 = lazy(
  () => import("@/app/components/IconExplain/type2/IconExplainContainer2"),
);
const TwoPictureContainer = lazy(
  () => import("@/app/components/twoPicture/type1/TwoPictureContainer"),
);
const TwoPictureContainer2 = lazy(
  () => import("@/app/components/twoPicture/type2/TwoPictureContainer2"),
);
const TwoPictureContainer3 = lazy(
  () => import("@/app/components/twoPicture/type3/TwoPictureContainer3"),
);
const TwoPictureContainer4 = lazy(
  () => import("@/app/components/twoPicture/type4/TwoPictureContainer4"),
);
const MaximContainer = lazy(() => import("@/app/components/maxim"));
const MaximType2 = lazy(() => import("@/app/components/maxim/MaximType2"));
const MaximType3 = lazy(() => import("@/app/components/maxim/MaximType3"));
const MaximType4 = lazy(() => import("@/app/components/maxim/MaximType4"));
const MaximType5 = lazy(() => import("@/app/components/maxim/MaximType5"));
const MaximType6 = lazy(() => import("@/app/components/maxim/MaximType6"));
const MaximType7 = lazy(() => import("@/app/components/maxim/MaximType7"));
const FreqAsked = lazy(() => import("@/app/components/freqAsked/FreqAsked"));
const BorderBoxContainer = lazy(
  () => import("@/app/components/borderBox/BorderBoxContainer"),
);
const BorderBoxContainerType2 = lazy(
  () => import("@/app/components/borderBox/type2/BorderBoxContainerType2"),
);
const BorderBoxContainerType3 = lazy(
  () => import("@/app/components/borderBox/type3/BorderBoxContainerType3"),
);
const BorderBoxContainerType4 = lazy(
  () => import("@/app/components/borderBox/type4/BorderBoxContainerType4"),
);
const BorderBoxContainerType5 = lazy(
  () => import("@/app/components/borderBox/type5/BorderBoxContainerType5"),
);
const BorderBoxContainerType6 = lazy(
  () => import("@/app/components/borderBox/type6/BorderBoxContainerType6"),
);
const BorderBoxContainerType7 = lazy(
  () => import("@/app/components/borderBox/type7/BorderBoxContainerType7"),
);
const NewsContainer = lazy(
  () => import("@/app/components/news/newsType1/NewsContainer"),
);
const NewsContainer2 = lazy(
  () => import("@/app/components/news/newsType2/NewsContainer2"),
);
const ExplanationBar = lazy(() => import("@/app/components/ExplanationBar"));
const PageBanner = lazy(() => import("@/app/components/PageBanner/PageBanner"));
const PageBannerType2 = lazy(
  () => import("@/app/components/PageBanner/PageBannerType2"),
);
const PageBannerType3 = lazy(
  () => import("@/app/components/PageBanner/PageBannerType3"),
);
const PageBannerType4 = lazy(
  () => import("@/app/components/PageBanner/PageBannerType4"),
);
const WorkTeamBar = lazy(
  () => import("@/app/components/WorkTeamBar/WorkTeamBar"),
);
const Map = lazy(() => import("@/app/components/map"));
const FullPageItem = lazy(() => import("@/app/components/fullPageItem"));
const FullPageItemType2 = lazy(
  () => import("@/app/components/fullPageItem/FullPageItemType2"),
);
const FullPageItemType3 = lazy(
  () => import("@/app/components/fullPageItem/FullPageItemType3"),
);
const FullPageItemType4 = lazy(
  () => import("@/app/components/fullPageItem/FullPageItemType4"),
);
const FullPageItemType5 = lazy(
  () => import("@/app/components/fullPageItem/FullPageItemType5"),
);
const FullPageItemType6 = lazy(
  () => import("@/app/components/fullPageItem/FullPageItemType6"),
);
const FullPageItemType7 = lazy(
  () => import("@/app/components/fullPageItem/FullPageItemType7"),
);
const FullPageItemType8 = lazy(
  () => import("@/app/components/fullPageItem/FullPageItemType8"),
);
const Slider = lazy(() => import("@/app/components/slider/Slider"));
const SliderType2 = lazy(() => import("@/app/components/slider/SliderType2"));
const TestimonialSliderType1 = lazy(
  () => import("@/app/components/testimonialSlider/TestimonialSliderType1"),
);
const TestimonialSliderType2 = lazy(
  () => import("@/app/components/testimonialSlider/TestimonialSliderType2"),
);
const TestimonialSliderType3 = lazy(
  () => import("@/app/components/testimonialSlider/TestimonialSliderType3"),
);
const TestimonialSliderType4 = lazy(
  () => import("@/app/components/testimonialSlider/TestimonialSliderType4"),
);
const TestimonialSliderType5 = lazy(
  () => import("@/app/components/testimonialSlider/TestimonialSliderType5"),
);
const TestimonialSliderType6 = lazy(
  () => import("@/app/components/testimonialSlider/TestimonialSliderType6"),
);
const TestimonialSliderType7 = lazy(
  () => import("@/app/components/testimonialSlider/TestimonialSliderType7"),
);
const Carousel = lazy(() => import("@/app/components/carousel"));
const CarouselType2 = lazy(
  () => import("@/app/components/carousel/CarouselType2"),
);
const CarouselType3 = lazy(
  () => import("@/app/components/carousel/CarouselType3"),
);
const CarouselType4 = lazy(
  () => import("@/app/components/carousel/CarouselType4"),
);
const CarouselType5 = lazy(
  () => import("@/app/components/carousel/CarouselType5"),
);
const YoutubeVideo = lazy(() => import("@/app/components/youtube"));
const ProgressBarContainer = lazy(
  () => import("@/app/components/ProgressBar/ProgressBarContainer"),
);
const TypingEffectContainer = lazy(
  () => import("@/app/components/TypingEffect/TypingEffectContainer"),
);
const ResumeBox = lazy(
  () => import("@/app/components/resumeBox/ResumeBoxContainer"),
);
const BackgroundHeader = lazy(
  () => import("@/app/components/BackgroundHeader/BackgroundHeader"),
);
const ResumeIcon = lazy(
  () => import("@/app/components/resumeIcon/ResumeIconContainer"),
);
const FreqAskedType2 = lazy(
  () => import("@/app/components/freqAsked/FreqAskedType2"),
);
const FreqAskedType3 = lazy(
  () => import("@/app/components/freqAsked/FreqAskedType3"),
);
const FreqAskedType4 = lazy(
  () => import("@/app/components/freqAsked/FreqAskedType4"),
);
const FreqAskedType5 = lazy(
  () => import("@/app/components/freqAsked/FreqAskedType5"),
);
const RestaurantMenuContainer = lazy(
  () => import("@/app/components/restaurantMenu/RestaurantMenuContainer"),
);

export interface ComponentConfig {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  propBuilder: (item: ContainerType, page: string) => any;
  showWrapper?: boolean;
}

const getRegistryKey = (
  componentName: string,
  componentType?: string,
): string => {
  return componentType ? `${componentName}:${componentType}` : componentName;
};

const componentRegistry: Record<string, ComponentConfig> = {
  "PictureAndText:type1": {
    component: PictureAtLeft,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: true,
  },
  "PictureAndText:type2": {
    component: PictureAtRight,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: true,
  },
  "PictureAndText:type3": {
    component: PictureAtLeftType3,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: true,
  },
  "PictureAndText:type4": {
    component: PicType4,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: true,
  },
  "PictureAndText:type5": {
    component: PicLeftType5,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: true,
  },
  "PictureAndText:type6": {
    component: PicLeftType6,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: true,
  },
  "TwoPictureContainer:type1": {
    component: TwoPictureContainer,
    propBuilder: propBuilders.buildTwoPictureProps,
    showWrapper: true,
  },
  "TwoPictureContainer:type2": {
    component: TwoPictureContainer2,
    propBuilder: propBuilders.buildTwoPictureProps,
    showWrapper: true,
  },
  "TwoPictureContainer:type3": {
    component: TwoPictureContainer3,
    propBuilder: propBuilders.buildTwoPictureProps,
    showWrapper: true,
  },
  "TwoPictureContainer:type4": {
    component: TwoPictureContainer4,
    propBuilder: propBuilders.buildTwoPictureProps,
    showWrapper: true,
  },
  "IconExplainContainer:type1": {
    component: IconExplainContainer,
    propBuilder: propBuilders.buildIconExplainProps,
    showWrapper: true,
  },
  "IconExplainContainer:type2": {
    component: IconExplainContainer2,
    propBuilder: propBuilders.buildIconExplainProps,
    showWrapper: true,
  },
  "NewsContainer:type1": {
    component: NewsContainer,
    propBuilder: propBuilders.buildNewsProps,
    showWrapper: true,
  },
  "NewsContainer:type2": {
    component: NewsContainer2,
    propBuilder: propBuilders.buildNewsProps,
    showWrapper: true,
  },
  "Slider:type1": {
    component: Slider,
    propBuilder: propBuilders.buildSliderProps,
    showWrapper: true,
  },
  "Slider:type2": {
    component: SliderType2,
    propBuilder: propBuilders.buildSliderProps,
    showWrapper: true,
  },
  "TestimonialSlider:type1": {
    component: TestimonialSliderType1,
    propBuilder: propBuilders.buildTestimonialSliderProps,
    showWrapper: true,
  },
  "TestimonialSlider:type2": {
    component: TestimonialSliderType2,
    propBuilder: propBuilders.buildTestimonialSliderProps,
    showWrapper: true,
  },
  "TestimonialSlider:type3": {
    component: TestimonialSliderType3,
    propBuilder: propBuilders.buildTestimonialSliderProps,
    showWrapper: true,
  },
  "TestimonialSlider:type4": {
    component: TestimonialSliderType4,
    propBuilder: propBuilders.buildTestimonialSliderProps,
    showWrapper: true,
  },
  "TestimonialSlider:type5": {
    component: TestimonialSliderType5,
    propBuilder: propBuilders.buildTestimonialSliderProps,
    showWrapper: true,
  },
  "TestimonialSlider:type6": {
    component: TestimonialSliderType6,
    propBuilder: propBuilders.buildTestimonialSliderProps,
    showWrapper: true,
  },
  "TestimonialSlider:type7": {
    component: TestimonialSliderType7,
    propBuilder: propBuilders.buildTestimonialSliderProps,
    showWrapper: true,
  },
  "FrequentlyAskedQuestions:type1": {
    component: FreqAsked,
    propBuilder: propBuilders.buildFreqAskedProps,
    showWrapper: true,
  },
  "FrequentlyAskedQuestions:type2": {
    component: FreqAskedType2,
    propBuilder: propBuilders.buildFreqAskedProps,
    showWrapper: true,
  },
  "FrequentlyAskedQuestions:type3": {
    component: FreqAskedType3,
    propBuilder: propBuilders.buildFreqAskedProps,
    showWrapper: true,
  },
  "FrequentlyAskedQuestions:type4": {
    component: FreqAskedType4,
    propBuilder: propBuilders.buildFreqAskedProps,
    showWrapper: true,
  },
  "FrequentlyAskedQuestions:type5": {
    component: FreqAskedType5,
    propBuilder: propBuilders.buildFreqAskedProps,
    showWrapper: true,
  },
  MaximContainer: {
    component: MaximContainer,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  "MaximContainer:type1": {
    component: MaximContainer,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  "MaximContainer:type2": {
    component: MaximType2,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  "MaximContainer:type3": {
    component: MaximType3,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  "MaximContainer:type4": {
    component: MaximType4,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  "MaximContainer:type5": {
    component: MaximType5,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  "MaximContainer:type6": {
    component: MaximType6,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  "MaximContainer:type7": {
    component: MaximType7,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  BorderBoxContainer: {
    component: BorderBoxContainer,
    propBuilder: propBuilders.buildBorderBoxProps,
    showWrapper: false,
  },
  "BorderBoxContainer:type1": {
    component: BorderBoxContainer,
    propBuilder: propBuilders.buildBorderBoxProps,
    showWrapper: false,
  },
  "BorderBoxContainer:type2": {
    component: BorderBoxContainerType2,
    propBuilder: propBuilders.buildBorderBoxProps,
    showWrapper: false,
  },
  "BorderBoxContainer:type3": {
    component: BorderBoxContainerType3,
    propBuilder: propBuilders.buildBorderBoxProps,
    showWrapper: false,
  },
  "BorderBoxContainer:type4": {
    component: BorderBoxContainerType4,
    propBuilder: propBuilders.buildBorderBoxProps,
    showWrapper: false,
  },
  "BorderBoxContainer:type5": {
    component: BorderBoxContainerType5,
    propBuilder: propBuilders.buildBorderBoxProps,
    showWrapper: false,
  },
  "BorderBoxContainer:type6": {
    component: BorderBoxContainerType6,
    propBuilder: propBuilders.buildBorderBoxProps,
    showWrapper: false,
  },
  "BorderBoxContainer:type7": {
    component: BorderBoxContainerType7,
    propBuilder: propBuilders.buildBorderBoxProps,
    showWrapper: false,
  },
  TypingEffectContainer: {
    component: TypingEffectContainer,
    propBuilder: propBuilders.buildTypingEffectProps,
    showWrapper: false,
  },
  "TypingEffectContainer:type1": {
    component: TypingEffectContainer,
    propBuilder: propBuilders.buildTypingEffectProps,
    showWrapper: false,
  },
  ExplanationBar: {
    component: ExplanationBar,
    propBuilder: propBuilders.buildExplanationBarProps,
    showWrapper: false,
  },
  "ExplanationBar:type1": {
    component: ExplanationBar,
    propBuilder: propBuilders.buildExplanationBarProps,
    showWrapper: false,
  },
  ProgressBar: {
    component: ProgressBarContainer,
    propBuilder: propBuilders.buildProgressBarProps,
    showWrapper: false,
  },
  "ProgressBar:type1": {
    component: ProgressBarContainer,
    propBuilder: propBuilders.buildProgressBarProps,
    showWrapper: false,
  },
  ResumeBox: {
    component: ResumeBox,
    propBuilder: propBuilders.buildResumeBoxProps,
    showWrapper: false,
  },
  "ResumeBox:type1": {
    component: ResumeBox,
    propBuilder: propBuilders.buildResumeBoxProps,
    showWrapper: false,
  },
  Carousel: {
    component: Carousel,
    propBuilder: propBuilders.buildCarouselProps,
    showWrapper: false,
  },
  "Carousel:type1": {
    component: Carousel,
    propBuilder: propBuilders.buildCarouselProps,
    showWrapper: false,
  },
  "Carousel:type2": {
    component: CarouselType2,
    propBuilder: propBuilders.buildCarouselProps,
    showWrapper: false,
  },
  "Carousel:type3": {
    component: CarouselType3,
    propBuilder: propBuilders.buildCarouselProps,
    showWrapper: false,
  },
  "Carousel:type4": {
    component: CarouselType4,
    propBuilder: propBuilders.buildCarouselProps,
    showWrapper: false,
  },
  "Carousel:type5": {
    component: CarouselType5,
    propBuilder: propBuilders.buildCarouselProps,
    showWrapper: false,
  },
  ResumeIcon: {
    component: ResumeIcon,
    propBuilder: propBuilders.buildResumeIconProps,
    showWrapper: false,
  },
  "ResumeIcon:type1": {
    component: ResumeIcon,
    propBuilder: propBuilders.buildResumeIconProps,
    showWrapper: false,
  },
  YoutubeVideo: {
    component: YoutubeVideo,
    propBuilder: propBuilders.buildYoutubeVideoProps,
    showWrapper: false,
  },
  "YoutubeVideo:type1": {
    component: YoutubeVideo,
    propBuilder: propBuilders.buildYoutubeVideoProps,
    showWrapper: false,
  },
  PageBanner: {
    component: PageBanner,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  "PageBanner:type1": {
    component: PageBanner,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  "PageBanner:type2": {
    component: PageBannerType2,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  "PageBanner:type3": {
    component: PageBannerType3,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  "PageBanner:type4": {
    component: PageBannerType4,
    propBuilder: propBuilders.buildPictureWithStyleProps,
    showWrapper: false,
  },
  WorkTeamBar: {
    component: WorkTeamBar,
    propBuilder: propBuilders.buildWorkTeamBarProps,
    showWrapper: false,
  },
  "WorkTeamBar:type1": {
    component: WorkTeamBar,
    propBuilder: propBuilders.buildWorkTeamBarProps,
    showWrapper: false,
  },
  Map: {
    component: Map,
    propBuilder: () => ({}),
    showWrapper: false,
  },
  BackgroundHeader: {
    component: BackgroundHeader,
    propBuilder: propBuilders.buildBackgroundHeaderProps,
    showWrapper: false,
  },
  "BackgroundHeader:type1": {
    component: BackgroundHeader,
    propBuilder: propBuilders.buildBackgroundHeaderProps,
    showWrapper: false,
  },
  FullPageItem: {
    component: FullPageItem,
    propBuilder: propBuilders.buildFullPageItemProps,
    showWrapper: false,
  },
  "FullPageItem:type1": {
    component: FullPageItem,
    propBuilder: propBuilders.buildFullPageItemProps,
    showWrapper: false,
  },
  "FullPageItem:type2": {
    component: FullPageItemType2,
    propBuilder: propBuilders.buildFullPageItemProps,
    showWrapper: false,
  },
  "FullPageItem:type3": {
    component: FullPageItemType3,
    propBuilder: propBuilders.buildFullPageItemProps,
    showWrapper: false,
  },
  "FullPageItem:type4": {
    component: FullPageItemType4,
    propBuilder: propBuilders.buildFullPageItemProps,
    showWrapper: false,
  },
  "FullPageItem:type5": {
    component: FullPageItemType5,
    propBuilder: propBuilders.buildFullPageItemProps,
    showWrapper: false,
  },
  "FullPageItem:type6": {
    component: FullPageItemType6,
    propBuilder: propBuilders.buildFullPageItemProps,
    showWrapper: false,
  },
  "FullPageItem:type7": {
    component: FullPageItemType7,
    propBuilder: propBuilders.buildFullPageItemProps,
    showWrapper: false,
  },
  "FullPageItem:type8": {
    component: FullPageItemType8,
    propBuilder: propBuilders.buildFullPageItemProps,
    showWrapper: false,
  },
  RestaurantMenu: {
    component: RestaurantMenuContainer,
    propBuilder: propBuilders.buildNewsProps,
    showWrapper: true,
  },
  "RestaurantMenu:type1": {
    component: RestaurantMenuContainer,
    propBuilder: propBuilders.buildNewsProps,
    showWrapper: true,
  },
  "RestaurantMenu:type2": {
    component: RestaurantMenuContainer,
    propBuilder: propBuilders.buildNewsProps,
    showWrapper: true,
  },
  "RestaurantMenu:type3": {
    component: RestaurantMenuContainer,
    propBuilder: propBuilders.buildNewsProps,
    showWrapper: true,
  },
  "RestaurantMenu:type4": {
    component: RestaurantMenuContainer,
    propBuilder: propBuilders.buildNewsProps,
    showWrapper: true,
  },
  "RestaurantMenu:type5": {
    component: RestaurantMenuContainer,
    propBuilder: propBuilders.buildNewsProps,
    showWrapper: true,
  },
  "RestaurantMenu:type6": {
    component: RestaurantMenuContainer,
    propBuilder: propBuilders.buildNewsProps,
    showWrapper: true,
  },
};

export const getComponentConfig = (
  componentName: string,
  componentType?: string,
): ComponentConfig | null => {
  const key = getRegistryKey(componentName, componentType);
  return componentRegistry[key] || null;
};

export const hasComponent = (
  componentName: string,
  componentType?: string,
): boolean => {
  return getComponentConfig(componentName, componentType) !== null;
};

export { getRegistryKey };
