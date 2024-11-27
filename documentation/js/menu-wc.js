'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-a9134f8095a4cbbd719f4fcb3d76fbcb5ea14155858dc5b7bb146ba8f384bd02a2e46f4dcde55a3a6825dd3261caf80f4b5c584d5cc776dbe86dcc891959a364"' : 'data-bs-target="#xs-controllers-links-module-AppModule-a9134f8095a4cbbd719f4fcb3d76fbcb5ea14155858dc5b7bb146ba8f384bd02a2e46f4dcde55a3a6825dd3261caf80f4b5c584d5cc776dbe86dcc891959a364"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-a9134f8095a4cbbd719f4fcb3d76fbcb5ea14155858dc5b7bb146ba8f384bd02a2e46f4dcde55a3a6825dd3261caf80f4b5c584d5cc776dbe86dcc891959a364"' :
                                            'id="xs-controllers-links-module-AppModule-a9134f8095a4cbbd719f4fcb3d76fbcb5ea14155858dc5b7bb146ba8f384bd02a2e46f4dcde55a3a6825dd3261caf80f4b5c584d5cc776dbe86dcc891959a364"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-a9134f8095a4cbbd719f4fcb3d76fbcb5ea14155858dc5b7bb146ba8f384bd02a2e46f4dcde55a3a6825dd3261caf80f4b5c584d5cc776dbe86dcc891959a364"' : 'data-bs-target="#xs-injectables-links-module-AppModule-a9134f8095a4cbbd719f4fcb3d76fbcb5ea14155858dc5b7bb146ba8f384bd02a2e46f4dcde55a3a6825dd3261caf80f4b5c584d5cc776dbe86dcc891959a364"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-a9134f8095a4cbbd719f4fcb3d76fbcb5ea14155858dc5b7bb146ba8f384bd02a2e46f4dcde55a3a6825dd3261caf80f4b5c584d5cc776dbe86dcc891959a364"' :
                                        'id="xs-injectables-links-module-AppModule-a9134f8095a4cbbd719f4fcb3d76fbcb5ea14155858dc5b7bb146ba8f384bd02a2e46f4dcde55a3a6825dd3261caf80f4b5c584d5cc776dbe86dcc891959a364"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-3a67f640f264ee6fc94ede28588e4ed0602c965c4a1cfee228a2b2e976c5c810622504b28a7bf54be5c75f976bd561ec866e28408244eb741d61caf8d60c0087"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-3a67f640f264ee6fc94ede28588e4ed0602c965c4a1cfee228a2b2e976c5c810622504b28a7bf54be5c75f976bd561ec866e28408244eb741d61caf8d60c0087"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-3a67f640f264ee6fc94ede28588e4ed0602c965c4a1cfee228a2b2e976c5c810622504b28a7bf54be5c75f976bd561ec866e28408244eb741d61caf8d60c0087"' :
                                            'id="xs-controllers-links-module-AuthModule-3a67f640f264ee6fc94ede28588e4ed0602c965c4a1cfee228a2b2e976c5c810622504b28a7bf54be5c75f976bd561ec866e28408244eb741d61caf8d60c0087"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-3a67f640f264ee6fc94ede28588e4ed0602c965c4a1cfee228a2b2e976c5c810622504b28a7bf54be5c75f976bd561ec866e28408244eb741d61caf8d60c0087"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-3a67f640f264ee6fc94ede28588e4ed0602c965c4a1cfee228a2b2e976c5c810622504b28a7bf54be5c75f976bd561ec866e28408244eb741d61caf8d60c0087"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-3a67f640f264ee6fc94ede28588e4ed0602c965c4a1cfee228a2b2e976c5c810622504b28a7bf54be5c75f976bd561ec866e28408244eb741d61caf8d60c0087"' :
                                        'id="xs-injectables-links-module-AuthModule-3a67f640f264ee6fc94ede28588e4ed0602c965c4a1cfee228a2b2e976c5c810622504b28a7bf54be5c75f976bd561ec866e28408244eb741d61caf8d60c0087"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/postsModule.html" data-type="entity-link" >postsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-postsModule-ab2077cbd7871f9a2827fee9750c0853090302e76f66cb6daa735018239f150fb3239a3e6b432384a01b28957ab8c92f80e91e9aed0b45af7439592165a38ab2"' : 'data-bs-target="#xs-controllers-links-module-postsModule-ab2077cbd7871f9a2827fee9750c0853090302e76f66cb6daa735018239f150fb3239a3e6b432384a01b28957ab8c92f80e91e9aed0b45af7439592165a38ab2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-postsModule-ab2077cbd7871f9a2827fee9750c0853090302e76f66cb6daa735018239f150fb3239a3e6b432384a01b28957ab8c92f80e91e9aed0b45af7439592165a38ab2"' :
                                            'id="xs-controllers-links-module-postsModule-ab2077cbd7871f9a2827fee9750c0853090302e76f66cb6daa735018239f150fb3239a3e6b432384a01b28957ab8c92f80e91e9aed0b45af7439592165a38ab2"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-postsModule-ab2077cbd7871f9a2827fee9750c0853090302e76f66cb6daa735018239f150fb3239a3e6b432384a01b28957ab8c92f80e91e9aed0b45af7439592165a38ab2"' : 'data-bs-target="#xs-injectables-links-module-postsModule-ab2077cbd7871f9a2827fee9750c0853090302e76f66cb6daa735018239f150fb3239a3e6b432384a01b28957ab8c92f80e91e9aed0b45af7439592165a38ab2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-postsModule-ab2077cbd7871f9a2827fee9750c0853090302e76f66cb6daa735018239f150fb3239a3e6b432384a01b28957ab8c92f80e91e9aed0b45af7439592165a38ab2"' :
                                        'id="xs-injectables-links-module-postsModule-ab2077cbd7871f9a2827fee9750c0853090302e76f66cb6daa735018239f150fb3239a3e6b432384a01b28957ab8c92f80e91e9aed0b45af7439592165a38ab2"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-b91daebe50f8db1b006cca4186120d0c11fcc0bf27e409d124a90f4ae14684225995705268fc6a9b2443e3033c825ac46428b92be0bec0f24fc5f547febe58d1"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-b91daebe50f8db1b006cca4186120d0c11fcc0bf27e409d124a90f4ae14684225995705268fc6a9b2443e3033c825ac46428b92be0bec0f24fc5f547febe58d1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-b91daebe50f8db1b006cca4186120d0c11fcc0bf27e409d124a90f4ae14684225995705268fc6a9b2443e3033c825ac46428b92be0bec0f24fc5f547febe58d1"' :
                                            'id="xs-controllers-links-module-UsersModule-b91daebe50f8db1b006cca4186120d0c11fcc0bf27e409d124a90f4ae14684225995705268fc6a9b2443e3033c825ac46428b92be0bec0f24fc5f547febe58d1"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-b91daebe50f8db1b006cca4186120d0c11fcc0bf27e409d124a90f4ae14684225995705268fc6a9b2443e3033c825ac46428b92be0bec0f24fc5f547febe58d1"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-b91daebe50f8db1b006cca4186120d0c11fcc0bf27e409d124a90f4ae14684225995705268fc6a9b2443e3033c825ac46428b92be0bec0f24fc5f547febe58d1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-b91daebe50f8db1b006cca4186120d0c11fcc0bf27e409d124a90f4ae14684225995705268fc6a9b2443e3033c825ac46428b92be0bec0f24fc5f547febe58d1"' :
                                        'id="xs-injectables-links-module-UsersModule-b91daebe50f8db1b006cca4186120d0c11fcc0bf27e409d124a90f4ae14684225995705268fc6a9b2443e3033c825ac46428b92be0bec0f24fc5f547febe58d1"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CretePostMetaOptionsDto.html" data-type="entity-link" >CretePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});