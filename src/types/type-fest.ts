export type { Includes as ArrayIncludes } from 'type-fest';
export type { IterableElement as ElementOf } from 'type-fest';
export type { Promisable as Awaitable } from 'type-fest';
export type { Replace as StringReplace } from 'type-fest';
export type { ScreamingSnakeCase as UpperSnakeCase } from 'type-fest';
export type { SetNonNullable as PartialNonNullable } from 'type-fest';
export type { SetOptional as PartialOptional } from 'type-fest';
export type { SetReadonly as PartialReadonly } from 'type-fest';
export type { SetRequired as PartialRequired } from 'type-fest';
export type { SetReturnType as PartialReturnType } from 'type-fest';
export type { Simplify as Explicit } from 'type-fest';
export type { Subtract as MathSubtract } from 'type-fest';
export type { Sum as MathAdd } from 'type-fest';
export type { TsConfigJson as TsConfig } from 'type-fest';

export type {
	ArrayIndices,
	ArrayValues,
	AsyncReturnType,
	ArraySlice,
	ArraySplice,
	Asyncify,
	CamelCase,
	CamelCasedProperties,
	CamelCasedPropertiesDeep,
	Class,
	// ConditionalExcept,
	// ConditionalPick,
	// ConditionalKeys,
	// ConditionalPickDeep,
	// ConditionalPickDeepOptions, // What is it for?
	Constructor,
	// DelimiterCase,
	// DelimiterCasedProperties,
	// DelimiterCasedPropertiesDeep,
	DistributedOmit,
	EmptyObject,
	Entries,
	Entry,
	Exact,
	Except,
	Finite,
	// FixedLengthArray,    // Use `ArrayOf<'exactly', 2, string>` instead
	Float,
	Get,
	GlobalThis,
	GreaterThan,
	GreaterThanOrEqual,
	HasOptionalKeys,
	HasReadonlyKeys,
	HasRequiredKeys,
	HasWritableKeys,
	IfAny,
	IfNever,
	IfUnknown,
	Integer,
	IntRange,
	InvariantOf,
	IsEmptyObject,
	IsAny,
	IsBooleanLiteral,
	IsEqual,
	IsLiteral,
	IsNegative,
	IsNever,
	IsNumericLiteral,
	IsStringLiteral,
	IsSymbolLiteral,
	IsUnknown,
	Join,
	JsonArray,
	JsonObject,
	JsonPrimitive,
	JsonValue,
	Jsonifiable,
	Jsonify,
	KebabCase,
	KebabCasedProperties,
	KebabCasedPropertiesDeep,
	KeysOfUnion,
	LastArrayElement,
	LessThan,
	LessThanOrEqual,
	LiteralToPrimitive,
	LiteralToPrimitiveDeep,
	LiteralUnion,
	Merge,
	MergeDeep,
	// MergeDeepOptions,                // What is it for?
	MergeExclusive,
	MultidimensionalArray,
	MultidimensionalReadonlyArray,
	Negative,
	NegativeFloat,
	NegativeInfinity,
	NegativeInteger,
	NonEmptyObject,
	NonNegative,
	NonNegativeInteger,
	// ObservableLike,   // If `Observable` proposal will be implemented
	// Observer,         // If `Observable` proposal will be implemented
	OmitDeep,
	OmitIndexSignature,
	// OnComplete,       // If `Observable` proposal will be implemented
	// OnError,          // If `Observable` proposal will be implemented
	// OnNext,           // If `Observable` proposal will be implemented
	Opaque,
	OptionalKeysOf,
	OverrideProperties,
	PackageJson,
	PartialDeep,
	// PartialDeepOptions,
	PartialOnUndefinedDeep,
	Paths,
	// PartialOnUndefinedDeepOptions,

	PascalCase,
	PascalCasedProperties,
	PascalCasedPropertiesDeep,

	PickDeep,
	PickIndexSignature,
	PositiveInfinity,
	Primitive,
	ReadonlyDeep,
	ReadonlyKeysOf,
	ReadonlyTuple,
	// RequireAllOrNone,
	// RequireAtLeastOne,
	// RequireExactlyOne,
	RequiredDeep,
	RequiredKeysOf,
	RequireOneOrNone,
	Schema,

	SetFieldType,
	SetParameterType,
	SharedUnionFieldsDeep,

	SnakeCase,
	SnakeCasedProperties,
	SnakeCasedPropertiesDeep,
	Split,
	Spread,
	StringKeyOf,
	Stringified,
	StringSlice,
	Tagged,
	TaggedUnion,
	// Trim, // Exported from the lib itself, as it allows to define trimmed character
	TupleToUnion,
	TypedArray,
	UnionToIntersection,
	UndefinedOnPartialDeep,
	// UnknownArray, // What is it for?
	UnknownRecord,
	// Unsubscribable, // If `Observable` proposal will be implemented
	UnwrapOpaque,
	UnwrapTagged,
	ValueOf,
	Writable,
	WritableDeep,
	WritableKeysOf,
} from 'type-fest';
