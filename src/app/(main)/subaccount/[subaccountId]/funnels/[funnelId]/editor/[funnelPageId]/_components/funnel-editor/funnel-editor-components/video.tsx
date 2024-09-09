"use client";
import { Badge } from "@/components/ui/badge";
import { EditorBtns } from "@/lib/constants";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Props = {
  element: EditorElement;
};

const VideoComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const styles = props.element.styles;
  const [lin, setLin] = useState("");
  useEffect(() => {
    // if () {
    const a = JSON.stringify(props.element.content);
    const gg = a.split(`.com/watch?v=`)[1].split(`"`)[0];
    console.log(gg);
    setLin(gg);
    // }
  }, [props.element]);

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    e.stopPropagation();
    if (type === null) return;
    // flushSync(() => {
    e.dataTransfer.setData("componentType", type);
    // });
    // console.log(e.dataTransfer.getData("componentType"));
  };
  // console.log("gg=", typeof props.element.content);
  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Clicked");
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, "video")}
      onClick={handleOnClick}
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center",
        {
          "!border-blue-500":
            state.editor.selectedElement.id === props.element.id,
          "!border-solid": state.editor.selectedElement.id === props.element.id,
          "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      {!Array.isArray(props.element.content) && (
        <iframe
          width={props.element.styles.width || "560"}
          height={props.element.styles.height || "315"}
          src={`https://www.youtube.com/embed/${lin}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      )}

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default VideoComponent;
