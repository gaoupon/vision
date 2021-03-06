import { ComponentType, ReactNode } from 'react'
import { object } from 'prop-types'

export type ChildMap = {
    [K: string]: Anchor | undefined
}

export type Anchor = {
    id: string
    nodes: Node[]
}

export type Node = {
    type?: string
    props?: object
    anchors?: ChildMap
}

// export type Renderer = ComponentType<{
//     readonly: boolean
//     requestUpdateProps: (props: object) => void
// }>

export type Renderer = (
    context: { readonly: boolean; requestUpdateProps: (props: object) => void; props: object }
) => ReactNode

type CompositorPropType = {
    set: (setter: (nodes: Node[]) => Node[]) => void
    rendererMap: RendererMap
    nodes: Node[]
    children: (operations: object[]) => ReactNode
}

export type CompositorType = ComponentType<CompositorPropType>

export type SetterType = (anchor: Anchor | undefined) => Anchor

export type ViewContextType = {
    childMap?: ChildMap
    getSetter?: () => (id: string, setter: SetterType) => void
}

export type RendererMap = {
    [K: string]: Renderer
}

export type EditorContextType = {
    readonly: boolean
    rendererMap?: RendererMap
    Compositor?: CompositorType
    operations: { [K: string]: [any, (value: any) => void] }
    operate: (operation: string, value: any) => void
}
