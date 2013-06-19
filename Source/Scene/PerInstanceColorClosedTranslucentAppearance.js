/*global define*/
define([
        '../Core/defaultValue',
        '../Core/freezeObject',
        '../Core/VertexFormat',
        '../Renderer/CullFace',
        '../Renderer/BlendingState',
        '../Shaders/Appearances/PerInstanceColorAppearanceVS',
        '../Shaders/Appearances/PerInstanceColorAppearanceFS'
    ], function(
        defaultValue,
        freezeObject,
        VertexFormat,
        CullFace,
        BlendingState,
        PerInstanceColorAppearanceVS,
        PerInstanceColorDefaultAppearanceFS) {
    "use strict";

    /**
     * DOC_TBA
     */
    var PerInstanceColorClosedTranslucentAppearance = function(options) {
        options = defaultValue(options, defaultValue.EMPTY_OBJECT);

        /**
         * DOC_TBA
         */
        this.material = undefined;

        /**
         * DOC_TBA
         */
        this.vertexFormat = PerInstanceColorClosedTranslucentAppearance.VERTEX_FORMAT;

        /**
         * DOC_TBA
         */
        this.vertexShaderSource = defaultValue(options.vertexShaderSource, PerInstanceColorAppearanceVS);

        /**
         * DOC_TBA
         */
        this.fragmentShaderSource = defaultValue(options.fragmentShaderSource, PerInstanceColorDefaultAppearanceFS);

        /**
         * DOC_TBA
         */
        this.renderState = defaultValue(options.renderState, {
            cull : {
                enabled : true,
                face : CullFace.BACK
            },
            depthTest : {
                enabled : true
            },
            depthMask : false,
            blending : BlendingState.ALPHA_BLEND
        });
    };

    /**
     * DOC_TBA
     */
    PerInstanceColorClosedTranslucentAppearance.VERTEX_FORMAT = freezeObject(VertexFormat.POSITION_AND_NORMAL);

    /**
     * DOC_TBA
     */
    PerInstanceColorClosedTranslucentAppearance.prototype.getFragmentShaderSource = function() {
        // Unlike other appearances, this does not have a material
        return this.fragmentShaderSource;
    };

    return PerInstanceColorClosedTranslucentAppearance;
});