<a href={'#'} class="customizer-trigger">
	<i class="uil uil-edit-alt" />
	<span>Customize...</span>
</a>

<style lang="scss">
	@import "../../../assets/sass/mixins/mixins.scss";
	:global{
		// Customizer
		.customizer-trigger {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px 0 0 10px;
		transition: all 0.3s ease;
		z-index: 999;
		font-size:14px;
		line-height: lh(14px, 20px);
		font-weight: 500;
		color:var(--color-gray);
		height: 34px;
		padding: 0 20px 0 15px;
		background-color: var(--bg-normal);
		border-radius: 50rem;
		margin-left: 10px;
			svg{
				path{
				fill:var(--color-gray);
				@include ssm{
					fill:var(--color-white);
				}
				}
			}
			i{
				margin-right: 8px;
			@include rfs(18px);
				fill:var(--color-gray);
				@include md{
				margin-right: 0;
				}
				@include ssm{
				color: var(--color-white);
				}
			}


			&:hover{
				background-color:rgba(var(--color-primary-rgba), .10);
				color:var(--color-primary);
				svg{
				path{
					fill:var(--color-primary);
				}
				}
				@include ssm{
				background-color:var(--color-dark);
				svg{
					path{
					fill:var(--color-white);
					}
				}
				}
			}
			@include md{
				padding: 0;
				width: 35px;
				height: 35px;
				span{
				display: none;
				}
				svg{
				margin-right:0;
				}
			}

			@include ssm {
				width: 50px;
				height: 50px;
				border-radius: 10px 0 0 10px;
				background-color:var(--color-primary);
				position: fixed;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				padding: 0;
				svg{
				margin: 0;
				}
				span{
				display:none;
				}
			}

			&.show {
				right: 200px;
			}

			svg,
			img {
				width: 20px;
				transition: all 0.3s ease;
				margin-right: 8px;
				@include ssm{
				width: 25px;
				}
			}

			}
			.customizer-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  transform: translateX(350px);
  height: 100vh;
  overflow-y: auto;
  background-color: var(--bg-white);
  box-shadow: 0 0 30px #9299b810;
  z-index: 9999;
  transition: all 0.3s ease;

  @include ssm {
    width: 280px;
    transform: translateX(280px);
  }

  &.show {
    transform: translateX(0);
  }
}

.customizer {
  height: 100%;

  @include e("head") {
    position: relative;
    padding: 18px 24px;
    border-bottom: 1px solid #f0f0f0;
    text-align: left;

    .customizer-close {
      position: absolute;
      right: 15px;
      top: 15px;

      svg,
      i {
        color: #ff4d4f;
      }
    }

    .customizer__sub-title {
      font-size: 14px;
    }
  }

  @include e("title") {
    font-weight: 600;
    @include rfs(18px);
    margin-bottom: 2px;
    color: var(--color-dark);
  }

  @include e("body") {
    padding: 25px;
  }

  @include e("single") {
    &:not(:last-child) {
      margin-bottom: 35px;
    }

    h4 {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 10px;
      color: var(--color-dark);
    }
  }
}

.customizer-list {
  margin: -10px;

  @include e("item") {
    position: relative;
    display: inline-block;
    min-height: 60px;
    background-size: cover;
    margin: 10px;

    a.active {

      i,
      svg {
        display: block;
      }
    }

    &.top {

      i,
      svg {
        top: 35px;
      }
    }

    &:hover {
      span {
        color: var(--color-primary);
      }
    }

    a {
      position: relative;
      display: block;

      i,
      svg {
        display: none;
        font-size: 18px;
        margin-top: 0;
        position: absolute;
        top: 15px;
        right: 15px;
        color: var(--color-success);
      }
    }

    img {
      width: 100%;
    }

    span {
      display: inline-block;
      margin-top: 15px;
      color: var(--color-dark);
    }
  }
}
		}
</style>