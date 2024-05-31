import { syntaxTree } from "@codemirror/language";
import { RangeSetBuilder } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  PluginValue,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
import { CopyWidget } from "./copy-code-widget";


class CopyInlineCodeViewPlugin implements PluginValue {
  decorations: DecorationSet;
  showOnHover: boolean;
  iconSymbol: string;

  constructor(view:EditorView, showOnHover: boolean, iconSymbol: string) {
    this.showOnHover = showOnHover;
    this.iconSymbol = iconSymbol;
    this.decorations = this.buildDecorations(view);
  }

  update(update: ViewUpdate) {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = this.buildDecorations(update.view);
    }
  }

  destroy() {}

  buildDecorations(view: EditorView): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();
    const showOnHover = this.showOnHover
    const iconSymbol = this.iconSymbol;
    for (const { from, to } of view.visibleRanges) {
      syntaxTree(view.state).iterate({
        from,
        to,
        enter(node) {
          if (node.type.name.startsWith("inline-code")) {
            builder.add(
              node.to + 1,
              node.to + 1,
              Decoration.widget({
                widget: new CopyWidget(showOnHover, iconSymbol),
              })
            );
          }
        },
      });
    }

    return builder.finish();
  }
}

export const createCopyPlugin = (showOnHover: boolean, iconSymbol: string) => {
  return ViewPlugin.define(
    (view: EditorView) => new CopyInlineCodeViewPlugin(view, showOnHover, iconSymbol),
    {
      decorations: (p) => p.decorations,
    }
  );
};
