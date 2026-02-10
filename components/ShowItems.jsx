import React, { useMemo } from "react";
import ProjectItem from "./projects/ProjectItem";
import Painting from "./Painting";
import { createdAtSerializator } from "../helpers/createdAtSerializator";

const ShowItems = (props) => {
  let filterItems = (list) => {
    if (props.categoriesFilter) {
      return list.filter(
        (item) =>
          item.author === props.filter &&
          item.category === props.categoriesFilter,
      );
    }
    return list && list.filter((item) => item.author === props.filter);
  };

  // const imagesShuffleHandler = (list) => {
  //   for (let i = list.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [list[i], list[j]] = [list[j], list[i]];
  //   }
  //   return list;
  // };

  // const shuffledList = useMemo(
  //   () => imagesShuffleHandler(props.imgList),
  //   [props.imgList]
  // );

  return (
    <>
      {props.filter === "" &&
        props.imgList.map((img) => (
          <Painting
            openModal={props.openModal}
            // editImage={editImage}
            filter={props.filter}
            catFilter={props.categoriesFilter}
            key={img.id}
            imgProp={img}
          ></Painting>
        ))}
      {props.categoriesFilter === "izložbe"
        ? filterItems(props.blogList).map((post) => (
            <ProjectItem
              key={post.id}
              filter={props.filter}
              postContent={props.post}
              // editProject={editProject}
              openModal={props.openModal}
            ></ProjectItem>
          ))
        : filterItems(props.imgList).map((img) => (
            <Painting
              openModal={props.openModal}
              // editImage={editImage}
              filter={props.filter}
              catFilter={props.categoriesFilter}
              key={img.id}
              imgProp={img}
            ></Painting>
          ))}
    </>
  );
};

export default ShowItems;
