import  { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Img, IsPublishedBlog, Tag, TitleWithEffect } from "../../Ui";
import { imageAddrees } from "../../../constant/SerevrRoute";
import { GetHtmlTemp } from "../../Modules";
// context -- >
import { BlogInfoContext } from "../../../context/pageContext";

export default function BlogDetails() {
  const {
    creator,
    title,
    description,
    createdAt,
    updatedAt,
    categoryID,
    body,
    cover,
    publish,
  } = useContext(BlogInfoContext)?.blogInfo;
  // STATES >>
  const [someDetailses, setSomeDetailses] = useState([]);
  // SIDE-EFFECTS >>
  useEffect(() => {
    // initial set-state >>
    setSomeDetailses([
      { id: uuid(), title: "نویسنده : ", text: creator?.name || "" },
      { id: uuid(), title: "دسته بندی :", text: categoryID?.title || "" },
      { id: uuid(), title: "انتشار :", text: createdAt?.slice(0, 10) || "" },
      { id: uuid(), title: "آپدیت :", text: updatedAt?.slice(0, 10) || "" },
    ]);
  }, []);
  return (
    <div className="text-dark dark:text-light font-dana-md text-sm space-y-6">
      <TitleWithEffect>{title}</TitleWithEffect>
      {/* Start Header Details */}
      <section className="flex items-center gap-2 flex-wrap">
        {someDetailses?.map((item) => {
          return (
            <Tag
              key={item?.id}
              text={
                <div className="flex items-center gap-1">
                  <span>{item?.title}</span>
                  {item?.text}
                </div>
              }
            />
          );
        })}
      </section>
      {/* Finish Header Details */}

      {/* Start Banner sectioon */}
      <section className="max-h-[250px] xs:max-h-[350px] _730:max-h-[400px] _840:max-h-[500px] lg:max-h-[400px] xl:max-h-[500px]">
        {/* First picture for this blog */}
        <Img
          loader
          className="rounded-lg aspect-video h-full w-full"
          loaderClassName="rounded-lg"
          src={`${imageAddrees}${cover}`}
        />
      </section>
      {/* Finish Banner sectioon */}

      {/* Ispublished Start */}
      <section>
        <IsPublishedBlog is={!!publish} />
      </section>
      {/* Ispublished Finish */}

      {/* Start Intro Description sectioon */}
      <section>
        {/* First description for this blog */}
        <div className="bg-bg-accent/30 p-2 rounded-lg">
          <p className="text-base break-words">{description}</p>
        </div>
      </section>
      {/* Finish Intro Description sectioon */}

      {/* (Start) Html template  (Section) */}
   
      <GetHtmlTemp htmlTemplate={body} />
    
      {/* (Finish) Html template  (Section) */}
    </div>
  );
}
