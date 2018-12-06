// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../ts-tools/@dhx/ts-data
//   ../ts-tools/@dhx/ts-common/view
//   ../ts-tools/@dhx/ts-toolbar
//   ../ts-tools/@dhx/ts-common/events
//   ../ts-tools/@dhx/ts-common/types


export type Callback = (...args: any[]) => any;
export interface IEventSystem<EVENT> {
    context: any;
    on(name: EVENT, callback: Callback, context?: any);
    detach(name: EVENT, context?:any);
    fire(name: EVENT, args?: any[]): boolean;
}

interface IEvent {
    callback: Callback;
    context: any;
}
interface IEvents {
    [key: string]: IEvent[];
}

export enum DataEvents {
    afterAdd = "afteradd",
    beforeAdd = "beforeadd",
    removeAll = "removeall",
    beforeRemove = "beforeremove",
    afterRemove = "afterremove",
    change = "change",
    load = "load"
}
export enum DragEvents {
    beforeDrag = "beforedrag",
    beforeDrop = "beforeDrop",
    dragStart = "dragstart",
    dragEnd = "dragend",
    canDrop = "candrop",
    cancelDrop = "canceldrop",
    dropComplete = "dropcomplete",
    dragOut = "dragOut",
    dragIn = "dragIn"
}

export enum DragMode {
    target = "target",
    both = "both",
    source = "source"
}
export enum DragBehaviour {
    child = "child",
    sibling = "sibling",
    complex = "complex"
}

export enum SelectionEvents {
    beforeUnSelect = "beforeunselect",
    afterUnSelect = "afterunselect",
    beforeSelect = "beforeselect",
    afterSelect = "afterselect"
}

export type Id = string;
export interface IDataProxy {
    load: () => Promise<any[]>;
    save: (data: any, mode: string) => Promise<any>;
}

export interface ISortMode {
    by?: string;
    dir?: string;
    as?: (a: any) => any;
    rule?: (a: any, b: any) => number;
}

export type IFilterCallback = (obj: any) => boolean;

export interface IFilterMode {
    by?: string;
    match?: Id | boolean;
    compare?:(value:any, match:any, obj:any) => boolean;
}
export interface IFilterConfig{
    add?:boolean;
    multiple?:boolean;
}
export interface IUpdateObject {
    [key: string]: any;
}
export interface IDataCollection<T extends IDataItem  = IDataItem> {
    loadData: Promise<any>;
    saveData: Promise<any>;
    events:IEventSystem<DataEvents>;
    add(obj: any, index?: number): void;
    remove(id: Id): void;
    removeAll(): void;
    update(id: Id, obj: IUpdateObject): void;

    exists(id: Id): boolean;
    getInitialData():T[];
    getItem(id: Id): T;
    getIndex(id: Id): number;
    getLength(): number;
    getId(index: number): Id;
    filter(rule?: IFilterMode | IFilterCallback, config?: IFilterConfig): void;
    find(rule: IFilterMode): T;
    findAll(rule: IFilterMode): T[];
    map(cb: DataCallback<T>): T[];
    sort(by: ISortMode): void;
    serialize():T[];
    copy(id: Id, index: number, target?: IDataCollection): void;
    move(id: Id, index: number, target?: IDataCollection): void;

    load(url: IDataProxy): Promise<any>;
    parse(data: any[]);

    save(url: IDataProxy): void; // Promise<any>;
    isSaved(): boolean;
}

export class DataCollection<T extends IDataItem = IDataItem> implements IDataCollection<T> {
    loadData: Promise<any>;
    saveData: Promise<any>;
    events:IEventSystem<DataEvents>;
    add(obj: any, index?: number): void;
    remove(id: Id): void;
    removeAll(): void;
    update(id: Id, obj: IUpdateObject): void;

    exists(id: Id): boolean;
    getInitialData():T[];
    getItem(id: Id): T;
    getIndex(id: Id): number;
    getLength(): number;
    getId(index: number): Id;
    filter(rule?: IFilterMode | IFilterCallback, config?: IFilterConfig): void;
    find(rule: IFilterMode): T;
    findAll(rule: IFilterMode): T[];
    map(cb: DataCallback<T>): T[];
    sort(by: ISortMode): void;
    serialize():T[];
    copy(id: Id, index: number, target?: IDataCollection): void;
    move(id: Id, index: number, target?: IDataCollection): void;

    load(url: IDataProxy): Promise<any>;
    parse(data: any[]);

    save(url: IDataProxy): void; // Promise<any>;
    isSaved(): boolean;
}


export interface IDataChangeStack {
    order: IDataChange[];
}
export type Statuses = "add" | "update" | "remove";
export interface IDataChange {
    id: Id;
    status: Statuses;
    obj: any;
    saving: boolean;
    promise?: Promise<any>;
    pending?: boolean;
    error?: boolean;
}
export type RequestStatus = "saving" | "pending" | "error";
export interface IDir {
    [key: string]: any;
    asc: number;
    desc: number;
}
export interface IDataDriver {
    toJsonArray(data: any): any[];
    getRows(data: string): any[];
    getFields(row: any): { [key: string]: any };
}
export enum TreeFilterType {
    all = 1,
    specific = 2,
    leafs = 3
}
export type DataCallback<T> = (item: T, index?: number) => any;

export type ReduceCallBack<T, A> = (acc: A, item: T, index?: number) => A;

export interface ITreeCollection<T extends IDataItem = IDataItem> extends IDataCollection<T> {
    add(obj: any, index?: number, parent?: Id): void;
    getRoot(): Id;
    getParent(id: Id): Id;
    removeAll(id?: Id): void;
    getLength(id?: Id): number;
    getIndex(id: Id): number;
    getChilds(id: Id): T[];
    sort(conf?: any): void;
    map(cb: DataCallback<T>, parent?: Id, direct?: boolean): any;
    reduce<A = any>(cb: ReduceCallBack<T, A>, acc: A): A;
    filter(conf?: any): void;
    restoreOrder(): void;
    copy(id: Id, index: number, target?: IDataCollection | ITreeCollection, targetId?: Id): Id;
    move(id: Id, index: number, target?: IDataCollection | ITreeCollection, targetId?: Id): Id;
    eachChild(id: Id, cb: DataCallback<T>, direct?: boolean): void;
    eachParent(id: Id, cb: DataCallback<T>, self?: boolean): void;
    loadChilds(id: Id, driver?: any): void;
    refreshChilds(id: Id, driver?: any): void;
    haveChilds(id: Id): boolean;
    canCopy(id: Id, target: Id): boolean;
}

export interface IDataItem {
    id: string;
    [key: string]: any;
}

export class TreeCollection<T extends IDataItem = IDataItem> extends DataCollection<T> implements ITreeCollection<T> {
    loadData: Promise<any>;
    saveData: Promise<any>;
    events:IEventSystem<DataEvents>;
    constructor(config?: any, events?: IEventSystem<DataEvents>);
    add(obj: any, index?: number, parent?: Id): void;
    getRoot(): Id;
    getParent(id: Id, asObj?: boolean): Id;
    getChilds(id: Id): T[];
    getLength(id?: Id): number;
    removeAll(id?: Id): void;
    getIndex(id: Id): number;
    sort(conf?: any): void;
    map(cb: DataCallback<T>, parent?: Id, direct?: boolean): any[];
    filter(conf?: any): void;
    reduce<A = any>(cb: ReduceCallBack<T, A>, acc: A): A;
    restoreOrder(): void;
    copy(id: Id, index: number, target?: IDataCollection | ITreeCollection, targetId?: Id): Id;
    move(id: Id, index: number, target?: ITreeCollection | IDataCollection, targetId?: Id): Id;
    eachChild(id: Id, cb: DataCallback<T>, direct?: boolean): void;
    getNearId(id: Id): Id;
    loadChilds(id: Id, driver?: any): void;
    refreshChilds(id: Id, driver?: any): void;
    eachParent(id: Id, cb: DataCallback<T>, self?: boolean): void;
    haveChilds(id: Id): boolean;
    canCopy(id: Id, target: Id): boolean;
    serialize(fn?: any): any[];
    getId(index: number, parent?: string): string;
    add(obj: any, index?: number): void;
    remove(id: Id): void;
    removeAll(): void;
    update(id: Id, obj: IUpdateObject): void;

    exists(id: Id): boolean;
    getInitialData():T[];
    getItem(id: Id): T;
    getIndex(id: Id): number;
    getLength(): number;
    getId(index: number): Id;
    filter(rule?: IFilterMode | IFilterCallback, config?: IFilterConfig): void;
    find(rule: IFilterMode): T;
    findAll(rule: IFilterMode): T[];
    map(cb: DataCallback<T>): T[];
    sort(by: ISortMode): void;
    serialize():T[];
    copy(id: Id, index: number, target?: IDataCollection): void;
    move(id: Id, index: number, target?: IDataCollection): void;

    load(url: IDataProxy): Promise<any>;
    parse(data: any[]);

    save(url: IDataProxy): void; // Promise<any>;
    isSaved(): boolean;
}


export class Uploader implements IUploader {
    config: IUploaderConfig;
    data: DataCollection<IFileWrapper>;
    events: IVaultEventSystem;
    isActive: boolean;
    constructor(config?: IUploaderConfig, data?: DataCollection<IFileWrapper>, events?: IVaultEventSystem);
    selectFile(): void;
    linkDropArea(element: HTMLElement | string): void;
    unlinkDropArea(element?: HTMLElement | string): void;
    parseFiles(dataTransfer: DataTransfer): void;
    send(params?: IParams): void;
    abort(id?: string): void;
}

export interface IView {
    getRootView(): any;
    paint(): any;
    mount(container: any, vnode: any): any;
}
export interface IViewLike {
    getRootView(): any;
}
export class View {
    config: any;
    constructor(_container: any, config: any);
    mount(container: any, vnode?: any): void;
    getRootView(): any;
    paint(): void;
}

export enum ItemType {
    button = "button",
    input = "input",
    separator = "separator",
    text = "text",
    iconButton = "iconButton", // out
    imageButton = "imageButton",
    spacer = "spacer",
    menuItem = "menuItem",
    imageButtonText = "imageButtonText", // out
    block = "block",
    customHTMLButton = "customButton",
    selectButton = "selectButton",
    dhxButton = "dhx-button"
}

export interface IItem extends IDataItem {
    type: ItemType;
    parent?: string;
    css?: string;
    $hidden?: boolean;
    $disabled?: boolean;
}

export interface IButton extends IItem {
    type: ItemType.button;
    icon?: string;
    size?: "small" | "large";
    hotkey?: string;
    value?: string;
    tooltip?: string;
    count?: number;
    group?: string;
    twoState?: boolean;
    active?: boolean;
}
export interface IDHXButton extends IItem {
    type: ItemType.dhxButton;
    icon?: string;
    usage?: "primary" | "secondary" | "danger" | "success";
    name?: "link" | "flat";
    size?: "small" | "large";
    hotkey?: string;
    value?: string;
    tooltip?: string;
    group?: string;
    twoState?: boolean;
    active?: boolean;
}
export interface IText extends IItem {
    type: ItemType.text;
    value?: string;
    tooltip?: string;
}
export interface IBlock extends IItem {
    type: ItemType.block;
    label?: string;
    direction?: "row" | "col";
}
export interface IInput extends IItem {
    type: ItemType.input;
    icon?: string;
    placeholder?: string;
    width?: string;
    value?: string;
}
export interface IIconButton extends IItem { // out
    type: ItemType.iconButton;
    icon: string;
    twoState?: boolean;
    active?: boolean;
}
export interface IImageButton extends IItem {
    type: ItemType.imageButton;
    src: string;
    twoState?: boolean;
    active?: boolean;
}
export interface IImageButtonText extends IItem { // out
    type: ItemType.imageButtonText;
    src: string;
    twoState?: boolean;
    active?: boolean;
}

export interface ISpacer extends IItem {
    type: ItemType.spacer;
}

export interface ISeparator extends IItem {
    type: ItemType.separator;
}

export interface IMenuItem extends IItem {
    type: ItemType.menuItem;
    $openIcon?: string;
    icon?: string;
    childs?: IElement[];
    value?: string;
    hotkey?: string;
}
export interface ISelectButton extends IItem {
    type: ItemType.selectButton;
    $openIcon?: string;
    icon?: string;
    childs?: IElement[];
}

export interface ICustomHTMLButton extends IItem {
    type: ItemType.customHTMLButton;
    html?: string;
    twoState?: boolean;
    active?: boolean;
    value?: string;
    count?: number;
}

export type IElement = IMenuItem | IButton | IInput | IBlock | IIconButton | IImageButton |
    IImageButtonText | ISeparator | ISpacer | IText | ICustomHTMLButton | ISelectButton | IDHXButton;


export interface IState {
    [key: string]: string;
}

export interface IToolbar {
    data: TreeCollection<IElement>;
    events: IEventSystem<DataEvents | ToolbarEvents>;
    getValues(): IState;
    setValues(state: IState): void;
    hide(id: string): void;
    show(id: string): void;
    disable(id: string): void;
    enable(id: string): void;
}

export interface IMenu {
    data: TreeCollection<IElement>;
    events: IEventSystem<DataEvents>;
    paint(): void;
}

export interface IContextMenu extends IMenu {
    showAt(element : HTMLElement | MouseEvent | string, showAt?: "bottom" | "right");
}

export interface IPopup {
    data: any[];
    mode: "bottom" | "other";
    position: any;
    width: number;
    height: number;
}

export enum ToolbarEvents {
    inputCreated = "inputcreated",
    click = "click"
}


export enum NavigationType {
    pointer = "pointer",
    click = "click"
}

export interface IGroups {
    [key: string]: {
        active?: string;
        elements: string[];
    };
}

export interface IToolbarConfig {
    css?: string;
}
export class MenuBase extends View {
    data: TreeCollection<IElement>;
    events: IEventSystem<DataEvents | ToolbarEvents>;
    config: any;

    constructor(element?: string | HTMLElement, config?: any);
    paint(): void;
    disable(ids: string | string[]): void;
    enable(ids: string | string[]): void;
    show(ids: string | string[]): void;
    hide(ids: string | string[]): void;
    destructor(): void;
}

export class Toolbar extends MenuBase implements IToolbar {
    config: IToolbarConfig;
    constructor(element?: string | HTMLElement, config?: IToolbarConfig);
    getValues(): IState;
    setValues(state: IState): void;
}

export class Vault extends View implements IVault {
    config: IVaultConfig;
    data: DataCollection<IFileWrapper>;
    events: IVaultEventSystem;
    uploader: IUploader;
    toolbar: Toolbar;
    constructor(container: HTMLElement | string, config?: IVaultConfig);
    destructor(): void;
}

export enum FileStatus {
    queue = "queue",
    uploaded = "uploaded",
    failed = "failed",
    inprogress = "inprogress"
}
export enum UploaderEvents {
    uploadBegin = "uploadbegin",
    beforeUploadFile = "beforeuploadfile",
    uploadFile = "uploadfile",
    uploadFail = "uploadfail",
    uploadComplete = "uploadcomplete",
    uploadProgress = "uploadprogress"
}
export enum ProgressBarEvents {
    cancel = "cancel"
}
export type FileHandler = (file?: object, extra?: object) => boolean | void;
export interface IParams {
    [key: string]: any;
}
export enum VaultMode {
    grid = "grid",
    list = "list"
}
export interface IVaultConfig {
    mode?: VaultMode;
    customScroll?: boolean;
    toolbar?: boolean;
    scaleFactor?: number;
    uploader?: IUploaderConfig;
    downloadURL?: string;
    progressBar?: IProgressBarConfig<IVaultProgressData>;
    data?: DataCollection<IFileWrapper>;
}
export interface IVault {
    data: DataCollection<IFileWrapper>;
    events: IEventSystem<DataEvents | UploaderEvents>;
    uploader: IUploader;
    paint(): void;
}
export interface IVaultProgressData {
    total: number;
    current: number;
}
export interface IProgressBarConfig<T> {
    template?: (percent: number, extra: T) => string;
}
export interface IUploader {
    config: IUploaderConfig;
    data: DataCollection<IFileWrapper>;
    events: IEventSystem<DataEvents | UploaderEvents>;
    isActive: boolean;
    selectFile(): void;
    abort(id?: string): void;
    linkDropArea(el: HTMLElement | string): void;
    unlinkDropArea(el?: HTMLElement | string): void;
    send(params?: IParams): void;
    parseFiles(dataTransfer: DataTransfer): any;
}
export interface IUploaderConfig {
    autosend?: boolean;
    target?: string;
    params?: IParams;
    singleRequest?: boolean;
    fieldName?: string;
    updateFromResponse?: boolean;
}
export interface IFileWrapper extends IDataItem {
    file: File;
    status: FileStatus;
    progress: number;
    link?: string;
    image?: HTMLImageElement;
    request?: XMLHttpRequest;
    path?: string;
    name?: string;
    size?: number;
    preview?: string;
    $toRemove?: boolean;
}
type BeforeReturnType = false | void;
interface IObjectWithAnyFields {
    [key: string]: string;
}
interface IEventHandlersMap {
    [UploaderEvents.uploadBegin]: (files?: IFileWrapper[]) => void;
    [UploaderEvents.beforeUploadFile]: (file: IFileWrapper) => BeforeReturnType;
    [UploaderEvents.uploadFile]: (file: IFileWrapper, extra?: IObjectWithAnyFields) => void;
    [UploaderEvents.uploadFail]: (file: IFileWrapper) => void;
    [UploaderEvents.uploadComplete]: (files?: IFileWrapper[]) => void;
    [UploaderEvents.uploadProgress]: (progress: number, current?: number, total?: number) => void;
    [ProgressBarEvents.cancel]: () => void;
    [DataEvents.beforeAdd]: (file: IFileWrapper) => BeforeReturnType;
    [DataEvents.beforeRemove]: (file: IFileWrapper) => BeforeReturnType;
    [DataEvents.afterAdd]: (file: IFileWrapper) => void;
    [DataEvents.afterRemove]: (file: IFileWrapper) => void;
    [DataEvents.removeAll]: () => void;
    [DataEvents.change]: (id?: string, status?: Statuses, file?: IFileWrapper) => void;
    [DataEvents.load]: () => void;
}
export interface IVaultEventSystem extends IEventSystem<DataEvents | UploaderEvents | ProgressBarEvents> {
    context: any;
    on<K extends keyof IEventHandlersMap>(event: K, callback: IEventHandlersMap[K], context?: any): any;
}