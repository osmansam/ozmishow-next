import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import { RestaurantMenuTypes } from "../../shared/compenentTypes";
import { NewsContainerType, PictureWithStyleType } from "../../shared/types";
import { RootState } from "../../store";
import Loading from "../loading";
import RestaurantMenuAdd from "./RestaurantMenuAdd";
import MenuBox1 from "./menuType1/MenuBox1";
import MenuBox2 from "./menuType2/MenuBox2";
import MenuBox3 from "./menuType3/MenuBox3";
import MenuBox4 from "./menuType4/MenuBox4";
import MenuBox5 from "./menuType5/MenuBox5";
import MenuBox6 from "./menuType6/MenuBox6";

const RestaurantMenuContainer = ({
  id,
  mainHeader,
  componentStyle,
  componentType,
  page,
}: NewsContainerType) => {
  const { language, isAdmin } = useSelector((state: RootState) => state.context);
  const [isLoading, setIsLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<PictureWithStyleType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [isAddNewItem, setIsAddNewItem] = useState(false);

  // Fetch data
  const getMenu = async () => {
    setIsLoading(true);
    try {
        const response = await axios.get(
            `https://ozmishow-back.onrender.com/api/v1/twoPicture/getNews/${id}?page=1&limit=100`
        );
        const items = response.data.news || [];
        setMenuItems(items);

        // Extract categories
        const cats = new Set<string>();
        items.forEach((item: PictureWithStyleType) => {
            if (item.paragraphs && item.paragraphs.content && item.paragraphs.content[2]) {
                cats.add(item.paragraphs.content[2]);
            }
        });
        setCategories(Array.from(cats));
        if (items.length > 0 && activeTab === "All" && cats.size > 0) {
             // Optional: set first category as active, or keep "All"
             setActiveTab("All");
        }
    } catch (error) {
        console.error("Error fetching menu:", error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    getMenu();
  }, [id]);

  const filteredItems = activeTab === "All" 
    ? menuItems 
    : menuItems.filter(item => item.paragraphs?.content?.[2] === activeTab);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col gap-4 mx-auto" style={componentStyle}>
       {/* Admin Controls */}
      <div className="w-full flex justify-end mr-20">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          isComponentType={true}
          componentTypes={RestaurantMenuTypes}
          currentType={componentType}
          twoPictureId={id ?? ""}
        />
      </div>

      {/* Tabs */}
      <div className="w-5/6 mx-auto flex flex-wrap gap-4 justify-center mb-8">
        <button
            onClick={() => setActiveTab("All")}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === "All" 
                ? "bg-black text-white shadow-lg" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
            All
        </button>
        {categories.map((cat, index) => (
            <button
                key={index}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    activeTab === cat 
                    ? "bg-black text-white shadow-lg" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
                {cat}
            </button>
        ))}
      </div>

      {/* Content - Render based on componentType */}
      <div className="w-5/6 mx-auto">
        {componentType === "type1" && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item, index) => (
                    <MenuBox1 key={index} item={item} />
                ))}
             </div>
        )}
        {componentType === "type2" && (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item, index) => (
                    <MenuBox2 key={index} item={item} />
                ))}
             </div>
        )}
        {componentType === "type3" && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {filteredItems.map((item, index) => (
                    <MenuBox3 key={index} item={item} />
                ))}
             </div>
        )}
        {componentType === "type4" && (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                    <MenuBox4 key={index} item={item} />
                ))}
             </div>
        )}
        {componentType === "type5" && (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredItems.map((item, index) => (
                    <MenuBox5 key={index} item={item} />
                ))}
             </div>
        )}
        {componentType === "type6" && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item, index) => (
                    <MenuBox6 key={index} item={item} />
                ))}
             </div>
        )}
        
        {/* Fallback if type is not recognized or default */}
        {!["type1", "type2", "type3", "type4", "type5", "type6"].includes(componentType) && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredItems.map((item, index) => (
                    <MenuBox1 key={index} item={item} />
                ))}
             </div>
        )}
      </div>

      {/* Add New Item Button */}
      {!isAddNewItem && isAdmin && (
        <button
          className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddNewItem(true)}
        >
          Add New Item
        </button>
      )}

      {/* Add New Item Form */}
      {isAddNewItem && isAdmin && (
        <RestaurantMenuAdd 
            id={id} 
            setIsAddNewItem={setIsAddNewItem} 
            page={page ?? ""}
            onSuccess={getMenu}
        />
      )}
    </div>
  );
};

export default RestaurantMenuContainer;
