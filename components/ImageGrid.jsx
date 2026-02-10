import React, { useEffect, useRef, useState } from "react";
import { fetchMorePaintings } from "../lib/fetchMorePaintings";
import Region from "../components/layout/Region";
import * as styles from "../styles/ImageGrid.module.css";
import GridListSwitcher from "./GridListSwitcher";
import Modal from "./Modal";
import EditImageModal from "./EditImageModal";
import CategoryFilter from "./CategoryFilter";
import Image from "next/image";
import Loader from "../components/Loader";
import ClientOnly from "./ClientOnly";
import EditProjectModal from "./projects/EditProjectModal";
// import ChevronDown from "./svg/ChevronDown";
import AnimationContainer from "./AnimationContainer";

import ShowItems from "./ShowItems";

const ImageGrid = (props) => {
  const [filter, setFilter] = useState("");
  const [grid, setGrid] = useState(true);
  const [categoriesFilter, setCategoriesFilter] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [openGeneralModal, setOpenGeneralModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [modalType, setModalType] = useState("");
  const [allImages, setAllImages] = useState(props.imgList || []);
  const [cursor, setCursor] = useState(props.imgCursor || null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(Boolean(props.imgCursor));
  const sentinelRef = useRef(null);

  useEffect(() => {
    setAllImages(props.imgList || []);
    setCursor(props.imgCursor || null);
    setHasMore(Boolean(props.imgCursor));
  }, [props.imgList, props.imgCursor]);

  // const [itemsToShow, setItemsToShow] = useState(6);

  useEffect(() => {
    openGeneralModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [openGeneralModal]);

  const authorFilterHandler = (e, name) => {
    e.preventDefault();
    setCategoriesFilter("");
    switch (name.toLowerCase()) {
      case "bojan":
        setFilter("bojan");
        break;
      case "jelena":
        setFilter("jelena");
        break;
      case "sve":
        setFilter("");
    }
  };

  const catFilterHandler = (category) => {
    setCategoriesFilter(category);
  };
  const gridListSwitcherHandler = (e) => {
    setGrid(e);
  };

  const openModal = (modalData, isOpen, modalType) => {
    setModalData(modalData);
    setOpenGeneralModal(isOpen);
    setModalType(modalType);
  };

  const closeModal = () => {
    setOpenGeneralModal(false);
    setIsLoaded(false);
    setAnimate(false);
  };

  const onLoadCallback = () => {
    setIsLoaded(true);
    setTimeout(() => {
      setAnimate(true);
    }, 200);
  };

  let modalContent = "";
  switch (modalType) {
    case "editProject":
      modalContent = (
        <EditProjectModal editProjectData={modalData}></EditProjectModal>
      );
      break;

    case "editPainting":
      modalContent = (
        <EditImageModal
          categories={props.categories}
          editModalData={modalData}
        ></EditImageModal>
      );
      break;

    case "paintingModal":
      modalContent = (
        <div className={styles.modalImgContainer}>
          {!isLoaded ? (
            <div className="full-loader">
              <Loader></Loader>
            </div>
          ) : (
            ""
          )}

          <Image
            className={styles.modalImg}
            fill
            src={modalData.image}
            alt={modalData.imgName ?? "slika"}
            sizes="(max-width: 768px) 100vw, 80vw"
            // quality={90}
            onLoadingComplete={onLoadCallback}
            unoptimized
          ></Image>
          {isLoaded ? (
            <ClientOnly>
              <div
                className={`${styles.modalImgTitle} + '[ bold ]' + [ wrap ] ${
                  animate ? styles.modalImgOpen : ""
                }`}
              >
                <h3>{modalData.imgName}</h3>
              </div>
              <div
                className={`${
                  styles.modalImgDescription
                } + '[ bold ]' + [ wrap ] ${
                  animate ? styles.modalImgOpen : ""
                }`}
              >
                <p>{"Godina: " + modalData.year}</p>
                <span className="spacer"></span>
                <p>{"Materijal: " + modalData.material}</p>
                <span className="spacer"></span>
                <p>{"Dimenzije: " + modalData.dimensions}</p>
              </div>
            </ClientOnly>
          ) : (
            ""
          )}
        </div>
      );
      break;
    default:
      "";
  }

  // const loadMoreItemsHandler = () => {
  //   setItemsToShow(itemsToShow + 3);
  // };
  const shouldAutoLoad = filter === "" && categoriesFilter === "";

  useEffect(() => {
    if (!sentinelRef.current) return;
    if (!hasMore) return;
    if (!shouldAutoLoad) return;

    const el = sentinelRef.current;

    const obs = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadMore();
        }
      },
      { root: null, rootMargin: "800px", threshold: 0 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [hasMore, shouldAutoLoad, cursor, isFetchingMore]);

  const loadMore = async () => {
    if (isFetchingMore || !hasMore) return;

    setIsFetchingMore(true);
    try {
      const { items, nextCursor } = await fetchMorePaintings(cursor);

      if (items.length > 0) {
        setAllImages((prev) => [...prev, ...items]);
      }

      setCursor(nextCursor);
      setHasMore(Boolean(nextCursor) && items.length > 0);
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetchingMore(false);
    }
  };

  return (
    <Region>
      {openGeneralModal ? (
        <Modal isOpenProp={openGeneralModal} closeModal={closeModal}>
          {modalContent}
        </Modal>
      ) : null}

      <div className={`${styles.gridStack} [ stack ]`}>
        <AnimationContainer>
          <div className={`${styles.gridWrap} [ wrap ]`}>
            <button
              aria-label="autor filter"
              className={
                filter === "jelena"
                  ? `${styles.activeBtn} [ button ]`
                  : "[ button ]"
              }
              onClick={(e) => authorFilterHandler(e, "jelena")}
            >
              Jelena Tijanić Savić
            </button>
            <button
              aria-label="autor filter"
              className={
                filter === "" ? `${styles.activeBtn} [ button ]` : "[ button ]"
              }
              onClick={(e) => authorFilterHandler(e, "sve")}
            >
              Mix
            </button>
            <button
              aria-label="autor filter"
              className={
                filter === "bojan"
                  ? `${styles.activeBtn} [ button ]`
                  : "[ button ]"
              }
              onClick={(e) => authorFilterHandler(e, "bojan")}
            >
              Bojan Savić
            </button>
          </div>
        </AnimationContainer>
        {filter !== "" && (
          <CategoryFilter
            catFilterHandler={catFilterHandler}
            filter={filter}
            categories={props.categories}
          ></CategoryFilter>
        )}
        {categoriesFilter !== "izložbe" ? (
          <GridListSwitcher
            switcher={gridListSwitcherHandler}
          ></GridListSwitcher>
        ) : null}

        <div
          className={`${styles.imgGridList} ${
            grid ? "[ grid ]" : "[ stack ]"
          } [ mr-bs-2 ]`}
        >
          <ShowItems
            categoriesFilter={categoriesFilter}
            imgList={allImages}
            blogList={props.blogList}
            openModal={openModal}
            filter={filter}
          ></ShowItems>
        </div>
        <div ref={sentinelRef} style={{ height: 1 }} />

        {isFetchingMore ? <Loader /> : null}

        {/* <button
          onClick={loadMoreItemsHandler}
          className={`${styles.loadMoreBtn} [ button ]`}
        >
          Još slika molim
          <ChevronDown
            width={15}
            height={15}
            fill={"var(--main)"}
          ></ChevronDown>
        </button> */}
      </div>
    </Region>
  );
};

export default ImageGrid;
