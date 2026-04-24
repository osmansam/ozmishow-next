"use client";

import { ContainerType } from "@/types";
import { getComponentConfig } from "./component-registry";

interface SchemaRendererProps {
  containers: ContainerType[];
  page: string;
}

function UnknownComponent({ container }: { container: ContainerType }) {
  return (
    <div className="w-full border border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <div className="font-semibold">Unknown component</div>
      <div>{container.componentName}</div>
      {container.componentType ? (
        <div>Type: {container.componentType}</div>
      ) : null}
    </div>
  );
}

export default function SchemaRenderer({
  containers,
  page,
}: SchemaRendererProps) {
  if (!containers || containers.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col">
      {containers.map((container, index) => {
        const config = getComponentConfig(
          container.componentName,
          container.componentType,
        );
        const key =
          container._id ||
          `${container.componentName}-${container.componentType || "default"}-${index}`;

        if (!config) {
          return (
            <section key={key} className="w-full">
              <UnknownComponent container={container} />
            </section>
          );
        }

        const Component = config.component;
        const componentProps = config.propBuilder(container, page);

        const content = <Component {...componentProps} />;

        if (config.showWrapper) {
          return (
            <section key={key} className="w-full">
              {content}
            </section>
          );
        }

        return <div key={key}>{content}</div>;
      })}
    </div>
  );
}
